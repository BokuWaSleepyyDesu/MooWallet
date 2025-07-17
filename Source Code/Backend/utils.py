import hashlib, random, smtplib
from database import get_db_connection
# from crud import get_account_by_email
from email.mime.text import MIMEText
from datetime import datetime, timezone, timedelta

login = ['moowallett@gmail.com','rsum ruap pxqs rwoe']

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(raw_password: str, hashed: str) -> bool:
    return hash_password(raw_password) == hashed

def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_email(email, otp, type):
    msg = MIMEText(f"Your OTP Code is {otp}")
    if type == "registration":
        msg['Subject'] = 'MooWallet Registration OTP'
    elif type == "setmpin":
        msg['Subject'] = 'MooWallet MPIN Setup OTP'
    elif type == "transaction":
        msg['Subject'] = 'MooWallet Transaction OTP'
    elif type == "recovery":
        msg['Subject'] = 'MooWallet Password Recovery OTP'
    msg['From'] = login[0]
    msg['To'] = email

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(login[0], login[1])
        server.sendmail(msg['From'], [msg['To']], msg.as_string())

def verify_otp(sender, otp, type):
    conn = get_db_connection()
    c = conn.cursor()
    if type == "registration":
        c.execute("""SELECT otp, created_at FROM otps WHERE email = ? AND type = 'registration' ORDER BY created_at DESC LIMIT 1""", (sender,))
        otp_row = c.fetchone()
    
    elif type == "setmpin":
        c.execute("""SELECT otp, created_at FROM otps WHERE email = ? AND type = 'setmpin' ORDER BY created_at DESC LIMIT 1""", (sender,))
        otp_row = c.fetchone()

    elif type == "transaction":
        c.execute("""SELECT otp, created_at FROM otps WHERE email = ? AND type = 'transaction' ORDER BY created_at DESC LIMIT 1""", (sender,))
        otp_row = c.fetchone()
    
    elif type == "recovery":
        c.execute("""SELECT otp, created_at FROM otps WHERE email = ? AND type = 'recovery' ORDER BY created_at DESC LIMIT 1""", (sender,))
        otp_row = c.fetchone()

    else:
        conn.close()
        return{}
    
    conn.close()

    if not otp_row:
        return{'status': 400, 'detail': 'OTP not found!'}
    
    db_otp, created_at = otp_row["otp"], otp_row["created_at"]

    if db_otp != otp:
        return{'status': 400, 'detail': 'Invalid OTP!'}
    
    created_time = datetime.strptime(created_at, "%Y-%m-%d %H:%M:%S")
    created_time = created_time.replace(tzinfo=timezone.utc)

    if created_time < datetime.now(timezone.utc) - timedelta(minutes=5):
        return {'status': 400, 'detail': 'OTP expired!'}
    
    return{'status': 200, 'detail': 'OTP matches!'}

def send_email(mail_to, mail_subject, mail_content):
    try:
        mail= MIMEText(f"{mail_content}", "plain", "utf-8")
        mail['Subject'] = mail_subject
        mail['From'] = login[0]
        mail['To'] = mail_to

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(login[0], login[1])
            server.sendmail(mail['From'], [mail['To']], mail.as_string())

        return {"status": 200, "detail" : "Mail successfully sent!"}
    except Exception as e:
        return {"status" : 400, "detail" : str(e)}

def verify_mpin(id, mpin):
    conn = get_db_connection()
    c = conn.cursor()
    try:
        c.execute("SELECT type, user_no, org_no FROM accounts WHERE account_id = ?", (id,))
        acc = c.fetchone()
        if not acc:
            conn.close()
            return {"status": "failed", "error": "Sender not found"}

        if acc["type"] == "user":
            c.execute("SELECT mpin FROM users WHERE user_no = ?", (acc["user_no"],))
        else:
            c.execute("SELECT mpin FROM organizations WHERE org_no = ?", (acc["org_no"],))
        db_mpin = c.fetchone()
        if db_mpin["mpin"] != mpin:
            conn.close()
            return {"status" : 400, "detail" : "Invalid MPIN!"}

        else:
            conn.close()
            return {"status" : 200, "detail" : "MPIN matches!"}
    except Exception as e:
        conn.close()
        return {"status" : "failed", "detail" : str(e)}


def send_transaction_email(sender_id, receiver_id, amount):
    conn = get_db_connection()
    c = conn.cursor()
    try:
        c.execute("SELECT type, user_no, org_no FROM accounts WHERE account_id = ?", (sender_id,))
        sender_acc = c.fetchone()
        if not sender_acc:
            return {"status": "failed", "error": "Sender not found"}

        if sender_acc["type"] == "user":
            c.execute("SELECT first_name, phone_no, email FROM users WHERE user_no = ?", (sender_acc["user_no"],))
        else:
            c.execute("SELECT name, phone_no, email FROM organizations WHERE org_no = ?", (sender_acc["org_no"],))
        sender_name, sender_phone_no, sender_email = c.fetchone()

        c.execute("SELECT type, user_no, org_no FROM accounts WHERE account_id = ?", (receiver_id,))
        receiver_acc = c.fetchone()
        if not receiver_acc:
            return {"status": "failed", "error": "Receiver not found"}

        if receiver_acc["type"] == "user":
            c.execute("SELECT first_name, phone_no, email FROM users WHERE user_no = ?", (receiver_acc["user_no"],))
        else:
            c.execute("SELECT name, phone_no, email FROM organizations WHERE org_no = ?", (receiver_acc["org_no"],))
        receiver_name, receiver_phone_no, receiver_email = c.fetchone()

        amount = float(amount)
        
        sender_msg = MIMEText(f"Dear {sender_name},\n\nYou have successfully transferred NPR {amount:.2f} to {receiver_phone_no} ({receiver_name}).")
        sender_msg['Subject'] = 'MooWallet Fund Transfer Confirmation'
        sender_msg['From'] = login[0]
        sender_msg['To'] = sender_email

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(login[0], login[1])
            server.sendmail(sender_msg['From'], [sender_msg['To']], sender_msg.as_string())

        receiver_msg = MIMEText(f"Dear {receiver_name},\n\nYou have received NPR {amount:.2f} from {sender_phone_no} ({sender_name}).", "plain", "utf-8")
        receiver_msg['Subject'] = 'MooWallet Fund Received'
        receiver_msg['From'] = login[0]
        receiver_msg['To'] = receiver_email

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(login[0], login[1])
            server.sendmail(receiver_msg['From'], [receiver_msg['To']], receiver_msg.as_string())

        return {"status": "success"}

    except Exception as e:
        return {"status": "failed", "error": str(e)}

    finally:
        conn.close()

def generate_qr_code(data: str) -> str:
    return f"QR({data})"
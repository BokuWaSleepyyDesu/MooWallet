import hashlib, random, smtplib
from email.mime.text import MIMEText

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(raw_password: str, hashed: str) -> bool:
    return hash_password(raw_password) == hashed

def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_email(email, otp):
    msg = MIMEText(f"Your OTP Code is {otp}")
    msg['Subject'] = 'MooWallet Registration OTP'
    msg['From'] = 'no-reply@moowallet.com'
    msg['To'] = email

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login('moowallett@gmail.com', 'rsum ruap pxqs rwoe')
        server.sendmail(msg['From'], [msg['To']], msg.as_string())

def generate_qr_code(data: str) -> str:
    return f"QR({data})"
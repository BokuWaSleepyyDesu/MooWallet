from database import get_db_connection
from utils import hash_password, verify_password, send_transaction_email

def create_user(first_name, last_name, phone_no, email, password):
    conn = get_db_connection()
    c = conn.cursor()

    try:
        c.execute("""INSERT INTO users (first_name, last_name, phone_no, email, password) VALUES (?,?,?,?,?)""", 
                  (first_name, last_name, phone_no, email, hash_password(password)))
        user_id = c.lastrowid

        c.execute("""INSERT INTO accounts (type, user_no) VALUES ('user', ?)""",
                  (user_id,))
        conn.commit()
        return {"status":"success", "account_id":c.lastrowid}
    except Exception as e:
        return {"status":"error", 'error':str(e)}
    finally:
        conn.close()

def create_organization(name, phone_no, email, password):
    conn = get_db_connection()
    c = conn.cursor()

    try:
        c.execute("""INSERT INTO organizations (name, phone_no, email, password) VALUES (?, ?, ?, ?)""",
                  (name, phone_no, email, hash_password(password)))
        org_no = c.lastrowid

        c.execute("""INSERT INTO accounts (type, org_no) VALUES ('organization', ?)""",
                  (org_no,))
        conn.commit()

        return {'status':'success', 'account_id':c.lastrowid}
    except Exception as e:
        return {'status':'error', 'error': str(e)}
    finally:
        conn.close()

def get_account_by_email(email):
    conn = get_db_connection()
    c = conn.cursor()

    c.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = c.fetchone()

    if user:
        c.execute("SELECT account_id FROM accounts WHERE user_no = ?", (user["user_no"],))
        account =c.fetchone()
        conn.close()
        return {"type":"user", "data":dict(user), "account_id":account["account_id"]}
    
    c.execute("SELECT * FROM organizations WHERE email = ?", (email,))
    org = c.fetchone()

    if org:
        c.execute("SELECT account_id FROM accounts WHERE org_no = ?", (org["org_no"],))
        account = c.fetchone()
        conn.close()
        return {"type":"organization", "data":dict(org), "account_id":account["account_id"]}
    
    conn.close()
    return None

def get_account_by_phoneno(phone_no):
    conn = get_db_connection()
    c = conn.cursor()

    c.execute("SELECT * FROM users WHERE phone_no = ?", (phone_no,))
    user = c.fetchone()

    if user:
        c.execute("SELECT account_id FROM accounts WHERE user_no = ?", (user["user_no"],))
        account =c.fetchone()
        conn.close()
        return {"type":"user", "data":dict(user), "account_id":account["account_id"]}
    
    c.execute("SELECT * FROM organizations WHERE phone_no = ?", (phone_no,))
    org = c.fetchone()

    if org:
        c.execute("SELECT account_id FROM accounts WHERE org_no = ?", (org["org_no"],))
        account = c.fetchone()
        conn.close()
        return {"type":"organization", "data":dict(org), "account_id":account["account_id"]}
    
    conn.close()
    return None

def transfer(sender_id, receiver_id, amount):
    conn = get_db_connection()
    c = conn.cursor()

    try:
        c.execute("SELECT type, user_no, org_no FROM accounts WHERE account_id = ?", (sender_id,))
        sender_acc = c.fetchone()
        if not sender_acc:
            return {"status":"failed", "error":"Sender not found"}
        if sender_acc["type"] == "user":
            c.execute("SELECT balance from users WHERE user_no = ?", (sender_acc["user_no"],))
        else:
            c.execute("SELECT balance from organizations WHERE org_no = ?", (sender_acc["org_no"],))
        sender_balance = c.fetchone()["balance"]

        if sender_balance < amount:
            return {"status":"failed","error":"Insufficient balance"}
        
        c.execute("SELECT type, user_no, org_no FROM accounts WHERE account_id = ?", (receiver_id,))
        receiver_acc = c.fetchone()
        if not receiver_acc:
            return {"status":"failed", "error":"Receiver not found"}
        
        if sender_acc["type"] == "user":
            c.execute("UPDATE users SET balance = balance - ? WHERE user_no = ?", (amount, sender_acc["user_no"]))
        else:
            c.execute("UPDATE organizations SET balance = balance - ? WHERE org_no = ?", (amount, sender_acc["org_no"]))
        
        if receiver_acc["type"] == "user":
            c.execute("UPDATE users SET balance = balance + ? WHERE user_no = ?", (amount, receiver_acc["user_no"]))
        else:
            c.execute("UPDATE organizations SET balance = balance + ? WHERE org_no = ?", (amount, receiver_acc["org_no"]))
        
        c.execute("""INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)""",
                  (sender_id, receiver_id, amount))
        
        conn.commit()
        send_transaction_email(sender_id, receiver_id, str(amount))
        return {"status":"success"}
    except Exception as e:
        return {"status":"failed", "error": str(e)}
    finally:
        conn.close()
    
def get_transactions_by_account(account_id):
    conn = get_db_connection()
    c = conn.cursor()
    
    c.execute("""SELECT * FROM transactions WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp DESC""", (account_id, account_id))
    txns = c.fetchall()
    conn.close()
    return [dict(txn) for txn in txns]
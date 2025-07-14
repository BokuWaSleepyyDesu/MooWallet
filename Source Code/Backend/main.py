from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import create_tables, get_db_connection
from crud import (
    create_user, create_organization, get_email_by_account_id,
    get_account_by_email, get_account_by_phoneno,
    transfer, get_transactions_by_account
)
from utils import hash_password, generate_otp, send_otp_email, send_email, verify_otp, verify_password, verify_mpin
from datetime import datetime, timedelta

app = FastAPI()
create_tables()

# --------------- Models -------------------

class RegistrationOTPRequest(BaseModel):
    email: str

class UserRegisterRequest(BaseModel):
    first_name: str
    last_name: str
    phone_no: str
    email: str
    password: str
    otp: str

class OrgRegisterRequest(BaseModel):
    name: str
    phone_no: str
    email: str
    password: str
    otp: str

class LoginRequest(BaseModel):
    identifier: str
    password: str

class SetMPin(BaseModel):
    id: int
    mpin: str
    otp: str

class SetMPINOTPRequest(BaseModel):
    id: int

class TransactionOTPRequest(BaseModel):
    id: int

class SendMoneyRequest(BaseModel):
    sender_id: int
    receiver_id: int
    amount: float
    mpin: str | None = None
    otp: str | None = None
    method: str

class PasswordRecoveryOTPRequest(BaseModel):
    id: int

class PasswordRecovery(BaseModel):
    id: int
    otp: str
    password: str

# --------------- Routes -------------------

@app.post("/request-registration-otp")
def request_registration_otp(req: RegistrationOTPRequest):
    otp = generate_otp()
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("""INSERT INTO otps (type, email, otp) VALUES ('registration', ?, ?)""", (req.email, otp))
    conn.commit()
    conn.close()
    send_otp_email(req.email, otp, "registration")
    return {'message': 'OTP Sent!'}

@app.post("/register-user")
def register_user(req: UserRegisterRequest):
    otp_result = verify_otp(req.email, req.otp, "registration") 
    if otp_result['status'] != 200:
        raise HTTPException(status_code=otp_result['status'], detail=otp_result['detail'])

    result = create_user(
        req.first_name, req.last_name,
        req.phone_no, req.email, req.password
    )
    if result["status"] == "success":
        return {"message": "User registered", "account_id": result["account_id"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.post("/register-org")
def register_org(req: OrgRegisterRequest):
    otp_result = verify_otp(req.email, req.otp, "registration") 
    if otp_result['status'] != 200:
        raise HTTPException(status_code=otp_result['status'], detail=otp_result['detail'])
    
    result = create_organization(
        req.name, req.phone_no, req.email, req.password
    )
    if result["status"] == "success":
        return {"message": "Organization registered", "account_id": result["account_id"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.post("/login")
def login(req: LoginRequest):
    account = get_account_by_email(req.identifier)

    if not account:
        account = get_account_by_phoneno(req.identifier)

    if not account:
        raise HTTPException(status_code=404, detail="Account not found!")

    if not verify_password(req.password, account["data"]["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "message": "Login successful",
        "account_id": account["account_id"],
        "type": account["type"],
        "email": account["data"]["email"],
        "phone_no": account["data"]["phone_no"]
    }

@app.post("/request-setmpin-otp")
def request_setmpin_otp(req: SetMPINOTPRequest):
    user_email = get_email_by_account_id(req.id)
    conn = get_db_connection()
    c = conn.cursor()
    otp = generate_otp()
    c.execute("""INSERT INTO otps (type, email, otp) VALUES ('setmpin', ?, ?)""", (user_email, otp))
    conn.commit()
    conn.close()
    send_otp_email(user_email, otp, "setmpin")
    return {'message': 'OTP Sent!'}

@app.post("/set-mpin")
def set_mpin(req: SetMPin):
    user_email = get_email_by_account_id(req.id)
    otp_result = verify_otp(user_email, req.otp, "setmpin") 
    if otp_result['status'] != 200:
        raise HTTPException(status_code=otp_result['status'], detail=otp_result['detail'])
    
    conn = get_db_connection()
    c = conn.cursor()

    email = get_email_by_account_id(req.id)
    acc = get_account_by_email(email)

    if acc['type'] == "user":
        c.execute("""UPDATE users SET mpin = ? WHERE email = ?""", (req.mpin, email))
    else:
        c.execute("""UPDATE organizations SET mpin = ? WHERE email = ?""", (req.mpin, email))
    
    conn.commit()
    conn.close()
    
    return {'status':200, 'detail': 'Successfully set mpin!'}

@app.post("/request-transaction-otp")
def request_transaction_otp(req: TransactionOTPRequest):
    user_email = get_email_by_account_id(req.id)
    conn = get_db_connection()
    c = conn.cursor()
    otp = generate_otp()
    c.execute("""INSERT INTO otps (type, email, otp) VALUES ('transaction',?,?)""", (user_email, otp))
    conn.commit()
    conn.close()
    send_otp_email(user_email, otp, "transaction")
    return {'message': 'OTP Sent!'}

@app.post("/transfer")
def send_money_route(req: SendMoneyRequest):
    sender_email = get_email_by_account_id(req.sender_id)
    if req.method == 'mpin':
        mpin_result = verify_mpin(req.sender_id, req.mpin)
        if mpin_result['status'] != 200:
            raise HTTPException(status_code=401, detail="Invalid MPIN")
    
    elif req.method == 'otp':
        otp_result = verify_otp(sender_email, req.otp, "transaction")
        if otp_result['status'] != 200:
            raise HTTPException(status_code=otp_result['status'], detail=otp_result['detail'])
    
    elif req.method == 'fingerprint':
        pass
    
    else:
        raise HTTPException(status_code=400, detail="Unsupported Method")

    result = transfer(req.sender_id, req.receiver_id, req.amount)
    if result["status"] == "success":
        return {"message": "Transaction successful"}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.post("/request-password-recovery-otp")
def request_transaction_otp(req: PasswordRecoveryOTPRequest):
    user_email = get_email_by_account_id(req.id)
    conn = get_db_connection()
    c = conn.cursor()
    otp = generate_otp()
    c.execute("""INSERT INTO otps (type, email, otp) VALUES ('recovery',?,?)""", (user_email, otp))
    conn.commit()
    conn.close()
    send_otp_email(user_email, otp, "recovery")
    return {'status_code': 200, 'message': 'OTP Sent!'}

@app.post("/password-recovery")
def password_recover(req: PasswordRecovery):
    user_email = get_email_by_account_id(req.id)

    otp_result = verify_otp(user_email, req.otp, "recovery")  # use "recovery", not "transaction"
    if otp_result['status'] != 200:
        raise HTTPException(status_code=otp_result['status'], detail=otp_result['detail'])
    
    conn = get_db_connection()
    c = conn.cursor()
    
    c.execute("SELECT type, user_no, org_no FROM accounts WHERE account_id = ?", (req.id,))
    row = c.fetchone()
    
    if row:
        hashed_pw = hash_password(req.password)

        if row["type"] == 'user':
            c.execute("SELECT first_name FROM users WHERE user_no = ?", (row["user_no"],))
            user_row = c.fetchone()
            user_name = user_row["first_name"] if user_row else "User"
            
            c.execute("UPDATE users SET password = ? WHERE email = ?", (hashed_pw, user_email))
        else:
            c.execute("SELECT name FROM organizations WHERE org_no = ?", (row["org_no"],))
            org_row = c.fetchone()
            user_name = org_row["name"] if org_row else "Organization"
            
            c.execute("UPDATE organizations SET password = ? WHERE email = ?", (hashed_pw, user_email))

        conn.commit()
        conn.close()

        mail_subject = "Password Changed Successfully!"
        mail_content = f"Dear {user_name}, your password has been successfully recovered!"
        send_email(user_email, mail_subject, mail_content)

        return {"message": "Password reset successful"}
    else:
        conn.close()
        raise HTTPException(status_code=400, detail="Account not found!")

@app.get("/transactions/{account_id}")
def get_txns(account_id: int):
    txns = get_transactions_by_account(account_id)
    return {"transactions": txns}

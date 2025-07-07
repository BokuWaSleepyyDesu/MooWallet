from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import create_tables, get_db_connection
from crud import (
    create_user, create_organization,
    get_account_by_email, get_account_by_phoneno,
    transfer, get_transactions_by_account
)
from utils import generate_otp, send_otp_email, verify_otp, verify_password, verify_mpin
from datetime import datetime, timedelta

app = FastAPI()
create_tables()

# --------------- Models -------------------

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

class SendMoneyRequest(BaseModel):
    sender_id: int
    receiver_id: int
    amount: float
    mpin: str | None = None
    otp: str | None = None
    method: str

class SetMPin(BaseModel):
    email: str
    mpin: str
    otp: str

class RegistrationOTPRequest(BaseModel):
    email: str

class SetMPINOTPRequest(BaseModel):
    email: str

class TransactionOTPRequest(BaseModel):
    email: str

class PasswordRecoveryOTPRequest(BaseModel):
    email: str

class PasswordRecovery(BaseModel):
    email: str
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
        raise HTTPException(status_code=404, detail="Account not found")

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
    conn = get_db_connection()
    c = conn.cursor()
    otp = generate_otp()
    c.execute("""INSERT INTO otps (type, email, otp) VALUES ('setmpin', ?, ?)""", (req.email, otp))
    conn.commit()
    conn.close()
    send_otp_email(req.email, otp, "setmpin")
    return {'message': 'OTP Sent!'}

@app.post("/set-mpin")
def set_mpin(req: SetMPin):
    otp_result = verify_otp(req.email, req.otp, "setmpin") 
    if otp_result['status'] != 200:
        raise HTTPException(status_code=otp_result['status'], detail=otp_result['detail'])
    
    conn = get_db_connection()
    c = conn.cursor()

    acc = get_account_by_email(req.email)

    if acc['type'] == "user":
        c.execute("""UPDATE users SET mpin = ? WHERE email = ?""", (req.mpin, req.email))
    else:
        c.execute("""UPDATE organizations SET mpin = ? WHERE email = ?""", (req.mpin, req.email))
    
    conn.commit()
    conn.close()
    
    return {'status':200, 'detail': 'Successfully set mpin!'}

@app.post("/transfer")
def send_money_route(req: SendMoneyRequest):
    if req.method == 'mpin':
        if not verify_mpin(req.sender_id, req.mpin):
            raise HTTPException(status_code=401, detail="Invalid MPIN")
    
    elif req.method == 'otp':
        if not verify_otp(req.sender_id, req.otp, "transaction"):
            raise HTTPException(status_code=401, detail="Invalid or expired OTP!")
    
    elif req.method == 'fingerprint':
        pass
    
    else:
        raise HTTPException(status_code=400, detail="Unsupported Method")

    result = transfer(req.sender_id, req.receiver_id, req.amount)
    if result["status"] == "success":
        return {"message": "Transaction successful"}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.get("/transactions/{account_id}")
def get_txns(account_id: int):
    txns = get_transactions_by_account(account_id)
    return {"transactions": txns}

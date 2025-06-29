from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import create_tables
from crud import (
    create_user, create_organization,
    get_account_by_email, get_account_by_phoneno,
    transfer, get_transactions_by_account
)
from utils import verify_password

app = FastAPI()
create_tables()

# --------------- Models -------------------

class UserRegisterRequest(BaseModel):
    first_name: str
    last_name: str
    phone_no: str
    email: str
    password: str

class OrgRegisterRequest(BaseModel):
    name: str
    phone_no: str
    email: str
    password: str

class LoginRequest(BaseModel):
    identifier: str
    password: str

class SendMoneyRequest(BaseModel):
    sender_id: int
    receiver_id: int
    amount: float

# --------------- Routes -------------------

@app.post("/register-user")
def register_user(req: UserRegisterRequest):
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

@app.post("/transfer")
def send_money_route(req: SendMoneyRequest):
    result = transfer(req.sender_id, req.receiver_id, req.amount)
    if result["status"] == "success":
        return {"message": "Transaction successful"}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.get("/transactions/{account_id}")
def get_txns(account_id: int):
    txns = get_transactions_by_account(account_id)
    return {"transactions": txns}

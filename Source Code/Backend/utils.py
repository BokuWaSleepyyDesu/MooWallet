import hashlib

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(raw_password: str, hashed: str) -> bool:
    return hash_password(raw_password) == hashed

def generate_qr_code(data: str) -> str:
    return f"QR({data})"
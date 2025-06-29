import os
import sqlite3

db_name = 'moowallet.db'

def get_db_connection():
    pwd = os.path.dirname(os.path.abspath(__file__))
    conn = sqlite3.connect(os.path.join(pwd, db_name))
    return conn

def create_tables():
    conn = get_db_connection()
    c = conn.cursor()

    c.execute("""CREATE TABLE IF NOT EXISTS accounts (
              account_id INTEGER PRIMARY KEY AUTOINCREMENT,
              type TEXT NOT NULL CHECK(type in ('user', 'organization')),
              user_no INTEGER UNIQUE,
              org_no INTEGER UNIQUE,
              FOREIGN KEY (user_no) REFERENCES users(user_no),
              FOREIGN KEY (org_no) REFERENCES organizations(org_no)
              );""")

    c.execute("""CREATE TABLE IF NOT EXISTS users (
            user_no INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone_no TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            balance REAL DEFAULT 0.0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );""")

    c.execute("""CREATE TABLE IF NOT EXISTS organizations (
              org_no INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              phone_no TEXT UNIQUE NOT NULL,
              email TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              balance REAL DEFAULT 0.0,
              created_at DATETIME DEFAULT CURRET_TIMESTAMP
              );""")

    c.execute("""CREATE TABLE IF NOT EXISTS transactions (
            txn_id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_id INTEGER NOT NULL,
            receiver_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sender_id) REFERENCES accounts(account_id),
            FOREIGN KEY (receiver_id) REFERENCES accounts(account_id)
            );""")

    conn.commit()
    conn.close()
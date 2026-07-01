"""
set_admin.py — Idempotent admin credential seeder.

Creates or updates the admin@example.com user with a bcrypt hash at cost=10
(fast but still secure). Run inside the api-gateway container:

    docker exec brain_api_gateway python3 scripts/set_admin.py
"""
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sqlalchemy import create_engine, text
import bcrypt


ADMIN_EMAIL = "admin@example.com"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"


def hash_pw(password: str) -> str:
    salt = bcrypt.gensalt(rounds=10)          # cost=10 → ~80ms vs ~300ms at 12
    return bcrypt.hashpw(password.encode(), salt).decode()


def set_admin():
    db_url = os.getenv(
        "POSTGRES_URL", "postgresql://postgres:postgres@db:5432/brain"
    )
    engine = create_engine(db_url)
    hashed_pwd = hash_pw(ADMIN_PASSWORD)

    with engine.begin() as conn:
        existing = conn.execute(
            text("SELECT id FROM users WHERE email = :email"),
            {"email": ADMIN_EMAIL},
        ).fetchone()

        if existing:
            conn.execute(
                text("""
                    UPDATE users
                    SET hashed_password = :pwd,
                        username        = :uname,
                        status          = 'active'
                    WHERE email = :email
                """),
                {"pwd": hashed_pwd, "uname": ADMIN_USERNAME, "email": ADMIN_EMAIL},
            )
            print(f"✓ Updated existing user → {ADMIN_EMAIL}")
        else:
            import uuid
            conn.execute(
                text("""
                    INSERT INTO users (id, username, email, hashed_password, status, is_superuser)
                    VALUES (:id, :uname, :email, :pwd, 'active', true)
                """),
                {
                    "id": str(uuid.uuid4()),
                    "uname": ADMIN_USERNAME,
                    "email": ADMIN_EMAIL,
                    "pwd": hashed_pwd,
                },
            )
            print(f"✓ Created new admin user → {ADMIN_EMAIL}")

    print(f"  Email:    {ADMIN_EMAIL}")
    print(f"  Password: {ADMIN_PASSWORD}")


if __name__ == "__main__":
    set_admin()

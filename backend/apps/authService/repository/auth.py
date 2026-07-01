from sqlalchemy.orm import Session
from apps.authService.model.auth import User, Session as AuthSession
from uuid import UUID
from typing import Optional
from datetime import datetime


# ==================== USER Repository ====================
def get_user_by_email(session: Session, email: str) -> Optional[User]:
    """Single indexed lookup — used for all login checks."""
    return session.query(User).filter(User.email == email).first()

def get_user_by_username(session: Session, username: str) -> Optional[User]:
    return session.query(User).filter(User.username == username).first()

def get_user_by_id(session: Session, user_id: UUID) -> Optional[User]:
    return session.query(User).filter(User.id == user_id).first()

def get_user_complete_info(session: Session, user_id: UUID):
    from sqlalchemy.orm import joinedload
    from apps.authService.model.auth import Role
    return (
        session.query(User)
        .options(joinedload(User.roles).joinedload(Role.permissions))
        .filter(User.id == user_id)
        .first()
    )

def get_all_users(session: Session, skip: int = 0, limit: int = 100):
    return session.query(User).offset(skip).limit(limit).all()

def create_user(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def update_user(session: Session, user_id: UUID, data: dict) -> Optional[User]:
    user = get_user_by_id(session, user_id)
    if not user:
        return None
    for key, value in data.items():
        if hasattr(user, key):
            setattr(user, key, value)
    session.commit()
    session.refresh(user)
    return user

def delete_user(session: Session, user_id: UUID) -> bool:
    user = get_user_by_id(session, user_id)
    if user:
        session.delete(user)
        session.commit()
        return True
    return False


# ==================== ROLE Repository ====================
from apps.authService.model.auth import Role

def create_role(session: Session, role: Role) -> Role:
    session.add(role)
    session.commit()
    session.refresh(role)
    return role

def get_role_by_id(session: Session, role_id: UUID) -> Optional[Role]:
    from sqlalchemy.orm import joinedload
    return session.query(Role).options(joinedload(Role.permissions)).filter(Role.id == role_id).first()

def get_role_by_name(session: Session, name: str) -> Optional[Role]:
    return session.query(Role).filter(Role.name == name).first()

def get_all_roles(session: Session):
    return session.query(Role).all()

def delete_role(session: Session, role_id: UUID) -> bool:
    role = get_role_by_id(session, role_id)
    if role:
        session.delete(role)
        session.commit()
        return True
    return False

def get_role_complete_info(session: Session, role_id: UUID):
    from sqlalchemy.orm import joinedload
    return session.query(Role).options(
        joinedload(Role.users), joinedload(Role.permissions)
    ).filter(Role.id == role_id).first()

def add_role_to_user(session: Session, user_id: UUID, role_id: UUID) -> bool:
    user = get_user_by_id(session, user_id)
    role = get_role_by_id(session, role_id)
    if user and role:
        if role not in user.roles:
            user.roles.append(role)
            session.commit()
        return True
    return False

def remove_role_to_user(session: Session, user_id: UUID, role_id: UUID) -> bool:
    user = get_user_by_id(session, user_id)
    role = get_role_by_id(session, role_id)
    if user and role:
        if role in user.roles:
            user.roles.remove(role)
            session.commit()
        return True
    return False

def remove_bulk_role_to_user(session: Session, user_id: UUID, role_ids) -> bool:
    user = get_user_by_id(session, user_id)
    if user:
        for role_id in role_ids:
            remove_role_to_user(session, user_id, role_id)
        return True
    return False


# ==================== PERMISSION Repository ====================
from apps.authService.model.auth import Permission

def create_permission(session: Session, permission: Permission) -> Permission:
    session.add(permission)
    session.commit()
    session.refresh(permission)
    return permission

def get_permission_by_id(session: Session, perm_id: UUID) -> Optional[Permission]:
    return session.query(Permission).filter(Permission.id == perm_id).first()

def get_all_permissions(session: Session):
    return session.query(Permission).all()

def delete_permission(session: Session, perm_id: UUID) -> bool:
    perm = get_permission_by_id(session, perm_id)
    if perm:
        session.delete(perm)
        session.commit()
        return True
    return False

def add_permission_to_role(session: Session, role_id: UUID, perm_id: UUID) -> bool:
    role = get_role_by_id(session, role_id)
    perm = get_permission_by_id(session, perm_id)
    if role and perm:
        if perm not in role.permissions:
            role.permissions.append(perm)
            session.commit()
        return True
    return False

def remove_permission_to_role(session: Session, role_id: UUID, perm_id: UUID) -> bool:
    role = get_role_by_id(session, role_id)
    perm = get_permission_by_id(session, perm_id)
    if role and perm:
        if perm in role.permissions:
            role.permissions.remove(perm)
            session.commit()
        return True
    return False

def remove_bulk_permission_to_role(session: Session, role_id: UUID, perm_ids) -> bool:
    for perm_id in perm_ids:
        remove_permission_to_role(session, role_id, perm_id)
    return True


# ==================== SESSION Repository ====================
def create_session(session: Session, auth_session: AuthSession) -> AuthSession:
    session.add(auth_session)
    session.commit()
    session.refresh(auth_session)
    return auth_session

def get_session_by_token(session: Session, token: str) -> Optional[AuthSession]:
    return session.query(AuthSession).filter(
        AuthSession.session_token == token,
        AuthSession.expires_at > datetime.utcnow()
    ).first()

def delete_session(session: Session, token: str) -> bool:
    s = session.query(AuthSession).filter(AuthSession.session_token == token).first()
    if s:
        session.delete(s)
        session.commit()
        return True
    return False

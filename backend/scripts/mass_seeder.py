"""
mass_seeder.py - Populates 1000 entries into each table with realistic, non-null data.
"""

import os
import random
import sys
import uuid
from datetime import timedelta
from decimal import Decimal

from bcrypt import gensalt, hashpw
from faker import Faker

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import core.db_events

core.db_events.setup_db_events = lambda: print("Kafka events disabled for mass seeder.")

# Models
from apps.authService.model.auth import Permission, Role, User
from apps.employeeService.model.department import Department
from apps.employeeService.model.designation import Designation
from apps.employeeService.model.employee import Employee
from apps.employeeService.model.software_tool import SoftwareTool
from apps.financeService.model.client import Client
from apps.financeService.model.invoice import Invoice
from apps.financeService.model.reimbursement import Reimbursement
from apps.financeService.model.revenue import ProjectRevenue
from apps.projectService.model.assignment import EmployeeProjectAssignment
from apps.projectService.model.cost import ProjectCost
from apps.projectService.model.project import Project
from apps.projectService.model.vendor import Vendor
from core.config import SessionLocal

fake = Faker()


def uid() -> uuid.UUID:
    return uuid.uuid4()


def hashed(password: str) -> str:
    return hashpw(password.encode(), gensalt()).decode()


def seed(db):
    NUM_RECORDS = 1000

    print(f"Generating {NUM_RECORDS} records for each table...")

    # 1. Permissions
    print("  [1/15] Permissions...")
    permissions = []
    for _ in range(NUM_RECORDS):
        p = Permission(
            id=uid(), name=f"permission_{uid().hex[:8]}", code=f"P_{uid().hex[:8]}"
        )
        permissions.append(p)
    db.add_all(permissions)
    db.commit()

    # 2. Roles
    print("  [2/15] Roles...")
    roles = []
    for _ in range(NUM_RECORDS):
        r = Role(id=uid(), name=f"Role_{uid().hex[:8]}", description=fake.sentence())
        roles.append(r)
    db.add_all(roles)
    db.commit()

    # 3. Users
    print("  [3/15] Users...")
    users = []
    default_password = hashed("password123")
    for _ in range(NUM_RECORDS):
        u = User(
            id=uid(),
            username=f"user_{uid().hex[:8]}",
            email=f"{uid().hex[:8]}@example.com",
            hashed_password=default_password,
            is_superuser=False,
            status="active",
        )
        u.roles = [random.choice(roles)]
        users.append(u)
    db.add_all(users)
    db.commit()

    admin_user = users[0]

    # 4. Departments
    print("  [4/15] Departments...")
    departments = []
    for _ in range(NUM_RECORDS):
        d = Department(
            id=uid(),
            name=f"Dept_{uid().hex[:8]}",
            description=fake.sentence(),
            status="active",
            cost_center_code=f"CC-{uid().hex[:8]}",
            created_by=admin_user.id,
        )
        departments.append(d)
    db.add_all(departments)
    db.commit()

    # 5. Designations
    print("  [5/15] Designations...")
    designations = []
    for _ in range(NUM_RECORDS):
        ds = Designation(
            id=uid(),
            name=f"Desig_{uid().hex[:8]}",
            description=fake.sentence()[:100],
            grade=random.choice(["L1", "L2", "L3", "L4", "L5"]),
            pay_band="10L-20L",
            status="active",
            created_by=admin_user.id,
        )
        designations.append(ds)
    db.add_all(designations)
    db.commit()

    # 6. Employees
    print("  [6/15] Employees...")
    employees = []
    for i in range(NUM_RECORDS):
        emp = Employee(
            id=uid(),
            user_code=f"EMP-{uid().hex[:8]}",
            department_id=random.choice(departments).id,
            designation_id=random.choice(designations).id,
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=users[i].email,
            contact_number=fake.phone_number()[:20],
            status="active",
            created_by=admin_user.id,
        )
        employees.append(emp)

    # Assign managers to some
    for i in range(1, NUM_RECORDS):
        employees[i].manager_id = employees[i - 1].id

    db.add_all(employees)
    db.commit()

    # 7. Software Tools
    print("  [7/15] Software Tools...")
    tools = []
    for _ in range(NUM_RECORDS):
        t = SoftwareTool(
            id=uid(),
            name=fake.company(),
            department_id=random.choice(departments).id,
            annual_cost=Decimal(random.randint(1000, 100000)),
            created_by=admin_user.id,
        )
        tools.append(t)
    db.add_all(tools)
    db.commit()

    # 8. Clients
    print("  [8/15] Clients...")
    clients = []
    for _ in range(NUM_RECORDS):
        c = Client(
            id=uid(),
            company_name=fake.unique.company(),
            industry=fake.job(),
            created_by=admin_user.id,
        )
        clients.append(c)
    db.add_all(clients)
    db.commit()

    # 9. Projects
    print("  [9/15] Projects...")
    projects = []
    for _ in range(NUM_RECORDS):
        sd = fake.date_between(start_date="-2y", end_date="today")
        ed = sd + timedelta(days=random.randint(30, 365))
        p = Project(
            id=uid(),
            name=fake.catch_phrase(),
            project_type=random.choice(
                ["fixed-price", "time-and-material", "retainer"]
            ),
            department_id=random.choice(departments).id,
            owner_employee_id=random.choice(employees).id,
            client_id=random.choice(clients).id,
            budget_allocated=Decimal(random.randint(10000, 1000000)),
            status=random.choice(["planning", "active", "completed", "on-hold"]),
            start_date=sd,
            end_date=ed,
            created_by=admin_user.id,
        )
        projects.append(p)
    db.add_all(projects)
    db.commit()

    # 10. Assignments
    print("  [10/15] Assignments...")
    assignments = []
    for _ in range(NUM_RECORDS):
        sd = fake.date_between(start_date="-2y", end_date="today")
        ed = sd + timedelta(days=random.randint(30, 365))
        a = EmployeeProjectAssignment(
            id=uid(),
            employee_id=random.choice(employees).id,
            project_id=random.choice(projects).id,
            role=fake.job(),
            allocation_percent=Decimal(random.randint(10, 100)),
            billing_rate=Decimal(random.randint(50, 500)),
            start_date=sd,
            end_date=ed,
            contribution_type=random.choice(["billable", "non-billable"]),
            created_by=admin_user.id,
        )
        assignments.append(a)
    db.add_all(assignments)
    db.commit()

    # 11. Vendors
    print("  [11/15] Vendors...")
    vendors = []
    for _ in range(NUM_RECORDS):
        v = Vendor(
            id=uid(),
            name=fake.company(),
            service_type=fake.bs(),
            created_by=admin_user.id,
        )
        vendors.append(v)
    db.add_all(vendors)
    db.commit()

    # 12. Project Costs
    print("  [12/15] Project Costs...")
    costs = []
    for _ in range(NUM_RECORDS):
        pc = ProjectCost(
            id=uid(),
            project_id=random.choice(projects).id,
            vendor_id=random.choice(vendors).id,
            amount=Decimal(random.randint(500, 50000)),
            cost_type=fake.word(),
            expense_date=fake.date_between(start_date="-1y", end_date="today"),
            created_by=admin_user.id,
        )
        costs.append(pc)
    db.bulk_save_objects(costs)
    db.commit()

    # 13. Invoices
    print("  [13/15] Invoices...")
    invoices = []
    for _ in range(NUM_RECORDS):
        inv = Invoice(
            id=uid(),
            client_id=random.choice(clients).id,
            project_id=random.choice(projects).id,
            amount=Decimal(random.randint(1000, 100000)),
            due_date=fake.date_between(start_date="today", end_date="+90d"),
            created_by=admin_user.id,
        )
        invoices.append(inv)
    db.bulk_save_objects(invoices)
    db.commit()

    # 14. Project Revenue
    print("  [14/15] Project Revenue...")
    revenues = []
    for _ in range(NUM_RECORDS):
        inv = random.choice(invoices)
        rev = ProjectRevenue(
            id=uid(),
            project_id=inv.project_id,
            client_id=inv.client_id,
            invoice_id=inv.id,
            revenue_amount=Decimal(random.randint(1000, int(inv.amount))),
            recognized_date=fake.date_between(start_date="-1y", end_date="today"),
            created_by=admin_user.id,
        )
        revenues.append(rev)
    db.bulk_save_objects(revenues)
    db.commit()

    # 15. Reimbursements
    print("  [15/15] Reimbursements...")
    reimbursements = []
    for _ in range(NUM_RECORDS):
        r = Reimbursement(
            id=uid(),
            employee_id=random.choice(employees).id,
            expense_id=uid(),
            claim_amount=Decimal(random.randint(50, 5000)),
            status=random.choice(["pending", "approved", "rejected"]),
            description=fake.sentence(),
            created_by=admin_user.id,
        )
        reimbursements.append(r)
    db.bulk_save_objects(reimbursements)
    db.commit()

    print(
        f"\n✅ Mass Seed complete! Successfully added {NUM_RECORDS} records to each table."
    )


if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed(db)
    except Exception as e:
        db.rollback()
        print(f"\n❌ Seed failed: {e}")
        raise
    finally:
        db.close()

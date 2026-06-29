"""Add CMS tables: blogs, case_studies, meeting_requests

Revision ID: cms_tables_001
Revises: cd38fb28e78f
Create Date: 2026-06-30 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

# revision identifiers, used by Alembic.
revision = 'cms_tables_001'
down_revision = '6740036ca37d'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'blogs',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('title', sa.Text, nullable=False),
        sa.Column('slug', sa.Text, nullable=False, unique=True, index=True),
        sa.Column('description', sa.Text),
        sa.Column('content', sa.Text, nullable=False),
        sa.Column('author', sa.Text, nullable=False),
        sa.Column('published', sa.Boolean, default=False, index=True),
        sa.Column('is_featured', sa.Boolean, default=False),
        sa.Column('tag_type', sa.Text, index=True),
        sa.Column('created_by', sa.Text),
        sa.Column('updated_by', sa.Text),
        sa.Column('created_at', sa.DateTime(timezone=True), index=True),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
    )

    op.create_table(
        'case_studies',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('title', sa.Text, nullable=False),
        sa.Column('slug', sa.Text, nullable=False, unique=True, index=True),
        sa.Column('subtitle', sa.Text),
        sa.Column('company_name', sa.Text, nullable=False, server_default=''),
        sa.Column('industry', sa.Text),
        sa.Column('author', sa.Text),
        sa.Column('content', sa.Text),
        sa.Column('published', sa.Boolean, default=False, index=True),
        sa.Column('is_featured', sa.Boolean, default=False),
        sa.Column('tag_type', sa.Text, index=True),
        sa.Column('seo_title', sa.Text),
        sa.Column('seo_description', sa.Text),
        sa.Column('created_by', sa.Text),
        sa.Column('updated_by', sa.Text),
        sa.Column('created_at', sa.DateTime(timezone=True), index=True),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
    )

    op.create_table(
        'meeting_requests',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.Text, nullable=False),
        sa.Column('email', sa.Text, nullable=False),
        sa.Column('phone', sa.Text),
        sa.Column('organization', sa.Text, nullable=False),
        sa.Column('purpose', sa.Text, nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), index=True),
    )


def downgrade() -> None:
    op.drop_table('meeting_requests')
    op.drop_table('case_studies')
    op.drop_table('blogs')

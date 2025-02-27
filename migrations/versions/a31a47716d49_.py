"""empty message

Revision ID: a31a47716d49
Revises: a4e43d0817b2
Create Date: 2025-02-27 02:26:31.823996

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a31a47716d49'
down_revision = 'a4e43d0817b2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=150),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=150),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=150),
               nullable=False)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=150),
               nullable=False)

    # ### end Alembic commands ###

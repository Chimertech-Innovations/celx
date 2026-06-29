export type UserRoleEnum =
  | 'READER'
  | 'AUTHOR'
  | 'REVIEWER'
  | 'ASSOCIATE_EDITOR'
  | 'EDITOR_IN_CHIEF'
  | 'EDITORIAL_OFFICE'
  | 'PRODUCTION_EDITOR'
  | 'FINANCE_ADMIN'
  | 'JOURNAL_ADMIN'
  | 'SUPER_ADMIN'
  | 'SERVICE_CUSTOMER'
  | 'SERVICE_TEAM'

export type Permission =
  | 'submit_manuscript'
  | 'view_own_manuscripts'
  | 'view_reviewer_dashboard'
  | 'accept_review_invitation'
  | 'submit_review'
  | 'view_editorial_dashboard'
  | 'assign_reviewer'
  | 'make_editorial_decision'
  | 'view_office_dashboard'
  | 'run_technical_check'
  | 'view_production_dashboard'
  | 'publish_article'
  | 'view_finance_dashboard'
  | 'manage_invoices'
  | 'view_admin_dashboard'
  | 'manage_users'
  | 'manage_journals'
  | 'manage_articles'
  | 'manage_announcements'
  | 'view_audit_logs'
  | 'create_service_order'
  | 'manage_service_orders'

const rolePermissions: Record<UserRoleEnum, Permission[]> = {
  READER: [],
  AUTHOR: [
    'submit_manuscript',
    'view_own_manuscripts',
    'create_service_order',
  ],
  REVIEWER: [
    'view_reviewer_dashboard',
    'accept_review_invitation',
    'submit_review',
  ],
  ASSOCIATE_EDITOR: [
    'view_editorial_dashboard',
    'assign_reviewer',
  ],
  EDITOR_IN_CHIEF: [
    'view_editorial_dashboard',
    'assign_reviewer',
    'make_editorial_decision',
  ],
  EDITORIAL_OFFICE: [
    'view_office_dashboard',
    'run_technical_check',
  ],
  PRODUCTION_EDITOR: [
    'view_production_dashboard',
    'publish_article',
  ],
  FINANCE_ADMIN: [
    'view_finance_dashboard',
    'manage_invoices',
  ],
  JOURNAL_ADMIN: [
    'view_admin_dashboard',
    'manage_journals',
    'manage_articles',
  ],
  SUPER_ADMIN: [
    'submit_manuscript',
    'view_own_manuscripts',
    'view_reviewer_dashboard',
    'accept_review_invitation',
    'submit_review',
    'view_editorial_dashboard',
    'assign_reviewer',
    'make_editorial_decision',
    'view_office_dashboard',
    'run_technical_check',
    'view_production_dashboard',
    'publish_article',
    'view_finance_dashboard',
    'manage_invoices',
    'view_admin_dashboard',
    'manage_users',
    'manage_journals',
    'manage_articles',
    'manage_announcements',
    'view_audit_logs',
    'create_service_order',
    'manage_service_orders',
  ],
  SERVICE_CUSTOMER: [
    'create_service_order',
  ],
  SERVICE_TEAM: [
    'manage_service_orders',
  ],
}

export function hasPermission(role: UserRoleEnum, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function getDashboardPath(role: UserRoleEnum): string {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'JOURNAL_ADMIN':
      return '/dashboard/admin'
    case 'AUTHOR':
    case 'SERVICE_CUSTOMER':
      return '/dashboard/author'
    case 'REVIEWER':
      return '/dashboard/reviewer'
    case 'EDITOR_IN_CHIEF':
    case 'ASSOCIATE_EDITOR':
      return '/dashboard/editor'
    case 'EDITORIAL_OFFICE':
      return '/dashboard/office'
    case 'PRODUCTION_EDITOR':
      return '/dashboard/production'
    case 'FINANCE_ADMIN':
      return '/dashboard/finance'
    case 'SERVICE_TEAM':
      return '/dashboard/admin'
    default:
      return '/dashboard/author'
  }
}

export function getRoleLabel(role: UserRoleEnum): string {
  const labels: Record<UserRoleEnum, string> = {
    READER: 'Reader',
    AUTHOR: 'Author',
    REVIEWER: 'Reviewer',
    ASSOCIATE_EDITOR: 'Associate Editor',
    EDITOR_IN_CHIEF: 'Editor-in-Chief',
    EDITORIAL_OFFICE: 'Editorial Office',
    PRODUCTION_EDITOR: 'Production Editor',
    FINANCE_ADMIN: 'Finance Admin',
    JOURNAL_ADMIN: 'Journal Admin',
    SUPER_ADMIN: 'Super Admin',
    SERVICE_CUSTOMER: 'Service Customer',
    SERVICE_TEAM: 'Service Team',
  }
  return labels[role] || role
}

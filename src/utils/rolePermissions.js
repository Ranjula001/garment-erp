// Role-based permissions for ERP system
export const ROLES = {
    SUPER_ADMIN: 'super-admin',
    ADMIN: 'admin', 
    MANAGER: 'manager',
    EMPLOYEE: 'employee'
};

export const PERMISSIONS = {
    // User Management
    CREATE_USER: 'create_user',
    READ_USER: 'read_user',
    UPDATE_USER: 'update_user',
    DELETE_USER: 'delete_user',
    
    // Employee Management
    CREATE_EMPLOYEE: 'create_employee',
    READ_EMPLOYEE: 'read_employee',
    UPDATE_EMPLOYEE: 'update_employee',
    DELETE_EMPLOYEE: 'delete_employee',
    
    // Department Management
    CREATE_DEPARTMENT: 'create_department',
    READ_DEPARTMENT: 'read_department',
    UPDATE_DEPARTMENT: 'update_department',
    DELETE_DEPARTMENT: 'delete_department',
    
    // System Management
    SYSTEM_CONFIG: 'system_config',
    VIEW_REPORTS: 'view_reports'
};

// Role permissions mapping
export const rolePermissions = {
    [ROLES.SUPER_ADMIN]: [
        // Full access to everything
        ...Object.values(PERMISSIONS)
    ],
    
    [ROLES.ADMIN]: [
        // User management (except super-admin operations)
        PERMISSIONS.CREATE_USER,
        PERMISSIONS.READ_USER,
        PERMISSIONS.UPDATE_USER,
        PERMISSIONS.DELETE_USER,
        
        // Full employee management
        PERMISSIONS.CREATE_EMPLOYEE,
        PERMISSIONS.READ_EMPLOYEE,
        PERMISSIONS.UPDATE_EMPLOYEE,
        PERMISSIONS.DELETE_EMPLOYEE,
        
        // Full department management
        PERMISSIONS.CREATE_DEPARTMENT,
        PERMISSIONS.READ_DEPARTMENT,
        PERMISSIONS.UPDATE_DEPARTMENT,
        PERMISSIONS.DELETE_DEPARTMENT,
        
        // Reports
        PERMISSIONS.VIEW_REPORTS
    ],
    
    [ROLES.MANAGER]: [
        // Limited employee management
        PERMISSIONS.CREATE_EMPLOYEE,
        PERMISSIONS.READ_EMPLOYEE,
        PERMISSIONS.UPDATE_EMPLOYEE,
        
        // Read department info
        PERMISSIONS.READ_DEPARTMENT,
        PERMISSIONS.UPDATE_DEPARTMENT,
        
        // Reports
        PERMISSIONS.VIEW_REPORTS
    ],
    
    [ROLES.EMPLOYEE]: [
        // Read-only access
        PERMISSIONS.READ_EMPLOYEE,
        PERMISSIONS.READ_DEPARTMENT
    ]
};

// Check if user has permission
export const hasPermission = (userRole, permission) => {
    const permissions = rolePermissions[userRole] || [];
    return permissions.includes(permission);
};

// Check if user has any of the required permissions
export const hasAnyPermission = (userRole, requiredPermissions) => {
    return requiredPermissions.some(permission => hasPermission(userRole, permission));
};

// Get all permissions for a role
export const getRolePermissions = (role) => {
    return rolePermissions[role] || [];
};
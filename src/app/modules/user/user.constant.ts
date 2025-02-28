export const USER_ROLE = {
  admin: 'admin',
  landLord: 'landLord',
  tenant: 'tenant',
} as const;

export const userSearchableFields = ['name', 'email', 'role'];

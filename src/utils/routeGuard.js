export const checkAuth = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const checkRole = (requiredRole) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === requiredRole;
};
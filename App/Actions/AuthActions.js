export const login = (token, userId) => {
  return { type: 'LOGIN', token: token, userId: userId };
};

export const logout = () => {
  return { type: 'LOGOUT' };
};

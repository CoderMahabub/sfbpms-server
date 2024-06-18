export const AuthError = () => {
  return {
    success: false,
    statusCode: 401,
    message: "You have no access to this route!",
  };
};

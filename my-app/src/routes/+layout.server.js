export const load = async ({ locals }) => {
  // Allow user data and basket count to be accessible on all routes
  return {
    user: locals.user,
  };
};

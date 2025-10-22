export const handleError = (error) => {
  console.error('Error:', error);
  return {
    message: error.message || 'An unexpected error occurred',
    code: error.code || 500
  };
};
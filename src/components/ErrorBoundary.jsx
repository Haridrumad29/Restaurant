import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();

  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : 'An unexpected error occurred.';

  return (
    <div className="error-container">
      <h1>Oops! Something went wrong</h1>
      <p>{message}</p>
      <Link to="/" className="back-link">
        Return to Home
      </Link>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home">
        Back to Home
      </Link>
    </div>
  );
}

export default Error404;
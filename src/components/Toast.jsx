import React from 'react';

function Toast({ message, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <div className="toast__icon">✅</div>
      <div className="toast__message">{message}</div>
    </div>
  );
}

export default Toast;

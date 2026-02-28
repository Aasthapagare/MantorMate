import React from 'react';

const TogglePanel = ({ onRegisterClick, onLoginClick }) => {
  return (
    <div className="toggle-box">
      <div className="toggle-panel toggle-left">
        <h1>Hello, Welcome!</h1>
        <p>Don't have an account?</p>
        <button className="btn register-btn" onClick={onRegisterClick}>
          Register
        </button>
      </div>
      <div className="toggle-panel toggle-right">
        <h1>Welcome Back!</h1>
        <p>Already have an account?</p>
        <button className="btn login-btn" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default TogglePanel;
import React, { useState, useEffect } from 'react';
import '../styles.css'; // Adjust the path if needed

// If you had logic in darkmode.js to toggle classes, you can integrate it here:
const toggleBodyClass = (isLightMode) => {
  document.body.classList.toggle('lightmode', isLightMode);
};

const LoginPage = () => {
  const [isLightMode, setIsLightMode] = useState(true); // default to light mode or dark mode as you prefer

  useEffect(() => {
    // On mount, set the initial theme
    toggleBodyClass(isLightMode);
  }, [isLightMode]);

  const handleThemeSwitch = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main>
      <section id="login" className="glass auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" required />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>

          <div className="input-box radio-in">
            <label>Role:</label>
            <div className="radio-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  id="role1"
                  value="user"
                  defaultChecked
                />
                <span className="radio-custom"></span>
                User
              </label>
              <label className="radio-option">
                <input type="radio" name="role" id="role2" value="designer" />
                <span className="radio-custom"></span>
                Designer
              </label>
            </div>
          </div>

          {/* If using React Router: <Link to="/signup">Don't have an account? Sign up</Link> */}
          <a href="signup.html">Don't have an account? Sign up</a>
          <button type="submit">Submit</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2024 SoalPich. All rights reserved.</p>
      </footer>

      <button
        id="theme-switch"
        className="glass"
        aria-label="Switch Theme"
        onClick={handleThemeSwitch}
      >
        {/* Light mode icon (Shown when dark mode is on) */}
        {/* Remember: We show/hide based on isLightMode */}
        {!isLightMode && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </svg>
        )}
        {/* Dark mode icon (Shown when light mode is on) */}
        {isLightMode && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
          </svg>
        )}
      </button>
    </main>
  );
};

export default LoginPage;

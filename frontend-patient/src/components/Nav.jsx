import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Nav() {
  const { token, logout } = React.useContext(AuthContext);
  return (
    <nav>
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
} 
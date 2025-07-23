import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: 500 }}>
        <h1 className="mb-4">Welcome to Home Page</h1>
        <div className="d-flex flex-column gap-3">
          {/* <Link to='/' className="btn btn-outline-primary">Home</Link> */}
          <Link to='/login' className="btn btn-primary">Login</Link>
          <Link to='/register' className="btn btn-success">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default App;

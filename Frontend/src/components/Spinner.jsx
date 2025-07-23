import React from "react";

const Spinner = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

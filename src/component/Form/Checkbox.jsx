import React from 'react';

const Checkbox = ({ label }) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className="form-checkbox" />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default Checkbox;

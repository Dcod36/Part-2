import React from 'react';

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>Total exercises: {total}</strong>
    </p>
  );
};

export default Total;

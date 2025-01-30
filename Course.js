// src/components/Course.js

import React from 'react';
import Header from './Header';   // Correct path to Header.js
import Content from './Content'; // Correct path to Content.js

const Course = ({ course }) => {
  // Calculate the total exercises using reduce
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p><strong>Total exercises: </strong>{totalExercises}</p>
    </div>
  );
};

export default Course;

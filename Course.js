// components/Course.js
import React from 'react';

// Header Component - Displays course name
const Header = ({ name }) => <h2>{name}</h2>;

// Part Component - Displays a single part with exercises
const Part = ({ part }) => (
  <p>
    {part.name} - {part.exercises} exercises
  </p>
);

// Content Component - Renders multiple parts of a course
const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

// Course Component - Wraps Header, Content, and Total Exercises
const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <strong>Total exercises: {totalExercises}</strong>
    </div>
  );
};

export default Course;

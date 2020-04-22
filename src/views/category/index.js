import React from 'react';
import './Category.css';
import { connect } from 'react-redux';

function Category({ categories }) {
  return (
    <div className="main-content">
      {categories.map((category, index) => (
        <div key={index}>
          <div>{category.id}</div>
          <br />
          <div>{category.name}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default connect((state) => state.category)(Category);

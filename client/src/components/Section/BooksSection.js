import React, { useState, useRef, useEffect } from 'react';
import './Section.css';
import { Link } from 'react-router-dom';
export default function BooksSection({ book }) {


  return (
    <div className="section">
        <Link to={`/history/${book['id']}`} style={{ marginRight: '10px' }} state={{ bookName:book['book_name'] }} className="book-link">
          <h2>{book['book_name']}</h2>
        </Link> 
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import './Section.css';

export default function BooksSection({ book }) {
  return (
    <div className="section" style={{cursor:'pointer'}}>
          <h2>{book['book_name']}</h2>
    </div>
  );
}

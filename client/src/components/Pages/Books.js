import React, {useState, useEffect, use} from 'react'
import { Link } from 'react-router-dom';
import '../Pages/Pages.css'
import BooksSections from '../Sections/BooksSections';
import Sections from '../Sections/Sections';
import HistoryPage from './History';


export default function Books(){
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("trying to get books")
        // const x = await fetch('http://localhost:8000/long_task')
        const response = await fetch('http://localhost:8000/get_books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);  // Store the fetched books
        console.log(data)
        console.log(response)
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  async function handlef(){
    const response = await fetch('http://localhost:8000/x')
  }

  return (
    <div className='page'>
      <h1>Library</h1>
      <BooksSections books={books}/>
    </div>
  );
}
import React, {useState, useEffect, use} from 'react'
import { Link } from 'react-router-dom';
export default function Books(){
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);  // Store the fetched books
        console.log(`Books: ${data}`, typeof(data))
        console.log(response)
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);


  return (
    <div>
      <h1>Audiobooks</h1>
      {books ? (
        <div>
          {books.map((book, index) => (
            <div key={index}>
              {/* Each book is a link that leads to the HistoryPage */}
              <Link to={`/history/${book}`} style={{ marginRight: '10px' }}>
                <button>{book}</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  );
}
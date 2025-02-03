import React, {useState, useEffect, use} from 'react'
import { Link } from 'react-router-dom';
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
    <div>
      <h1>Audiobooks</h1>
      {/* <button onClick={handlef}>click</button> */}
      {books ? (
        <div>
          {books.map((book, index) => (
            <div key={index}>
              {/* Each book is a link that leads to the HistoryPage */}
              <Link to={`/history/${book['id']}`} style={{ marginRight: '10px' }}>
                <button>{book['book_name']}</button>
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
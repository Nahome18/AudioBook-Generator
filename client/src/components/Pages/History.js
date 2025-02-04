import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';  // Import useParams to get the URL parameter
import '../Pages/Pages.css'
import Sections from '../Sections/Sections';

export default function HistoryPage() {
  const { bookId } = useParams();  // Extract the book name from the URL parameter
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullBookUrl, setFullBookUrl] = useState(null);
  const [full_exist, setFullExist] = useState(null);
  const location = useLocation();
  const bookName = location.state?.bookName;

  useEffect(() => {
    console.log(bookName)
    const fetchAudioFiles = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get_history/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch audio files');
        }
        const data = await response.json();
        const unprocessed_sections = data.processing
        for (let i = 0; i < unprocessed_sections; i++){
          data.urls.push("")
        }
        
        setAudioFiles(data.urls);  // Store audio files for the selected book
        setFullBookUrl(data.full_url)
        setFullExist(!!data.full_exist)
        console.log(data.urls)
        console.log(data.full_url)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFiles();  // Fetch the audio files when the page loads
  }, [bookId]);

  return (
    <div className='page'>
      <NavLink to="/">Home Page</NavLink>
      <h1>{bookName}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        // Corrected conditional rendering
        audioFiles.length > 0 ? (
          <Sections audioFiles={audioFiles} fullBookUrl={fullBookUrl} full_exist={full_exist}/>
        ) : (
          <p>No audio files.</p>  // Handle the case when no files are present
        )
      )}
    </div>
  );
}

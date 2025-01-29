import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';  // Import useParams to get the URL parameter
import Section from '../Section/Section';
import Sections from '../Sections/Sections';

export default function HistoryPage() {
  const { bookName } = useParams();  // Extract the book name from the URL parameter
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullBookUrl, setFullBookUrl] = useState(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get_history/${bookName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch audio files');
        }
        const data = await response.json();
        setAudioFiles(data.urls);  // Store audio files for the selected book
        setFullBookUrl(data.full_url)
        console.log(data.urls)
        console.log(data.full_url)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFiles();  // Fetch the audio files when the page loads
  }, [bookName]);

  return (
    <div>
      <h1>{bookName} Audio Files</h1>
      <NavLink to="/">Home Page</NavLink>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        // Corrected conditional rendering
        audioFiles.length > 0 ? (
          <Sections audioFiles={audioFiles} fullBookUrl={fullBookUrl}/>
          // <div>
          //   {audioFiles.map((file, index) => (
          //     <Section 
          //       key={index + 1}  // Ensure key is unique for each child
          //       name={`Section ${index + 1}`}
          //       audioUrl={file.url}  // Assuming file contains a 'url' property
          //     />
          //   ))}
          // </div>
        ) : (
          <p>No audio files available.</p>  // Handle the case when no files are present
        )
      )}
    </div>
  );
}

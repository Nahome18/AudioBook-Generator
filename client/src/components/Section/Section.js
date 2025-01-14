import React, { useState, useRef, useEffect } from 'react';
import './Section.css';

export default function Section({ name, audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);  // Ref for the audio element

  // Update the audio source when audioUrl changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;  // Dynamically set the source
      audioRef.current.load();          // Reload the audio element with the new URL
    }
  }, [audioUrl]);  // Trigger whenever audioUrl changes

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Reset play state when audio ends
  useEffect(() => {
    const handleEnd = () => setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnd);
    }

    // Cleanup event listener
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnd);
      }
    };
  }, []);

  return (
    <div className="section">
    {audioUrl?
    <>
      <h2>{name}</h2>
      <div className="buttons">
        <button onClick={() => window.location.href = audioUrl}>Download</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <audio ref={audioRef} preload="auto"></audio>
      </>:<span style={{fontStyle:'italic', fontSize:"15px"}}>Processing Section......</span>
    }
    </div>
  );
}

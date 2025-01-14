import React, { useState, useRef, useEffect } from 'react'
import './Section.css'

export default function Section({name, audioUrl}){
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(audioUrl))

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
        audioRef.current.addEventListener('ended', handleEnd);

        // Cleanup event listener
        return () => {
        audioRef.current.removeEventListener('ended', handleEnd);
        };
    }, []);
    return(
        <div className='section'>
            <h2>{name}</h2>
            <div className='buttons'>
            <button onClick={() => window.location.href = audioUrl}>Download</button>
            <button onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'} {/* Toggle button text */}
                </button>
            </div>
            <h1></h1>
            
        </div>
    )
}

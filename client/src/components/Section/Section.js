import React from 'react'
import './Section.css'

export default function Sections({name, audioUrl}){
    const audio = new Audio(audioUrl)
    return(
        <div className='section'>
            <h2>{name}</h2>
            {audioUrl && (
                <div className='buttons'>
                <button onClick={() => window.location.href = audioUrl}>Download</button>
                <button onClick={() => audio.play()}>Play</button>
                </div>
            )}
            <h1></h1>
            
        </div>
    )
}

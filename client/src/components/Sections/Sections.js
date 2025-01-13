import React from 'react'
import './Sections.css'
import Section from '../Section/Section'

export default function Sections({audioUrl, fileName, allUrlsResolved}){
    const fullBookUrl = `http://localhost:5000/merged/${fileName}`;
    return(
        <div className='sections'>
            {audioUrl.map((url, index) => {
                return (
                    <Section 
                        key={index + 1}  // Add a unique key for each child in a list
                        name={`Section ${index+1}`}
                        audioUrl={url}
                    />
                );
            })}
            {allUrlsResolved? <div className='full-book'>
                <Section 
                        name={`${fileName}`}
                        audioUrl={fullBookUrl}
                    />
            </div>:<></>}
        </div>
        
    )
}

import React from 'react'
import './Sections.css'
import Section from '../Section/Section'

export default function Sections({audioUrl}){
    // const fullBookUrl = `http://localhost:5000/final`;
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
            {/* <div className='full-book'>
                <Section 
                        name={`Full book`}
                        audioUrl={fullBookUrl}
                    />
            </div> */}
        </div>
        
    )
}

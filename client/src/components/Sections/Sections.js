import React from 'react'
import './Sections.css'
import Section from '../Section/Section'

export default function Sections({audioUrl}){
    return(
        <div className='sections'>
            {audioUrl.map((url, index) => {
                return (
                    <Section 
                        key={index}  // Add a unique key for each child in a list
                        indx={index}
                        audioUrl={url}
                    />
                );
            })}
        </div>
        
    )
}

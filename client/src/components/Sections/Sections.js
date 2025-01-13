import React, { useState, useEffect } from 'react'
import './Sections.css'
import Section from '../Section/Section'

export default function Sections({audioUrl, fileName, allUrlsResolved, fullUrlResolved, setFullUrlResolved}){
    const [fullBookUrl, setFullBookUrl] = useState(null);
    useEffect(() => {
        if (allUrlsResolved) {
          const fetchFullBookUrl = async () => {
            // Replace this with your actual endpoint for the full book
            const url = `http://localhost:5000/merged/${fileName}`
            try{
                const response = await fetch(url)
                if (response.ok){
                    setFullBookUrl(url)
                    setFullUrlResolved(true)
                }else {
                    console.error("Error fetching full audio");
                }
            }catch (error) {
                console.error("Error fetching full book URL:", error);
              }
          };
    
          fetchFullBookUrl();
        }
      }, [allUrlsResolved]); 
    return(
        <div className='sections'>
            <div className='content'>
                {audioUrl.map((url, index) => {
                    return (
                        <Section 
                            key={index + 1}  // Add a unique key for each child in a list
                            name={`Section ${index+1}`}
                            audioUrl={url}
                        />
                    );
                })}
            </div>
            {fullUrlResolved? <div className='full-book'>
                <Section 
                        name={`${fileName}`}
                        audioUrl={fullBookUrl}
                    />
            </div>:<></>}
        </div>
        
    )
}

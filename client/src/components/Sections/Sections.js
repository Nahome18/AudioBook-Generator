import React, { useState, useEffect } from 'react'
import './Sections.css'
import Section from '../Section/Section'
import FetchFullBookUrl from '../Methods/FetchFullBookUrl';

export default function Sections({audioFiles, fileName, allUrlsResolved, fullUrlResolved, setFullUrlResolved}){
    const [fullBookUrl, setFullBookUrl] = useState(null);
    useEffect(() => {
        if (allUrlsResolved) {
          FetchFullBookUrl(fileName, setFullBookUrl, setFullUrlResolved);
        }
      }, [allUrlsResolved]); 
    return(
        <div className='sections'>
            <div className='content'>
                {audioFiles.map((file, index) => (
                <Section 
                    key={index + 1}  // Ensure key is unique for each child
                    name={`Section ${index + 1}`}
                    audioUrl={file.url}  // Assuming file contains a 'url' property
                />
                ))}
                {/* {audioUrl.map((url, index) => {
                    return (
                        <Section 
                            key={index + 1}  // Add a unique key for each child in a list
                            name={`Section ${index+1}`}
                            audioUrl={url}
                        />
                    );
                })} */}
            </div>
            {fullUrlResolved ? (
                <div className='full-book'>
                    <Section 
                    name={"Full book"}
                    audioUrl={fullBookUrl}
                    />
                </div>
                ) : (
                fileName ? (
                    <span style={{ fontStyle: 'italic', fontSize: "15px" }} className='section'>
                    Processing Full Book......
                    </span>
                ) : null
                )}

        </div>
        
    )
}

import React, { useState, useEffect } from 'react'
import './Sections.css'
import Section from '../Section/Section'
import FetchFullBookUrl from '../Methods/FetchFullBookUrl';

export default function Sections({audioFiles, fullBookUrl, full_exist}){

    return(
        <div className='sections'>
            <div className='content'>
                {audioFiles.map((file, index) => 
                    (file? <Section 
                        key={index + 1}  // Ensure key is unique for each child
                        name={`Section ${index + 1}`}
                        audioUrl={file.url}  // Assuming file contains a 'url' property
                    />:<span style={{ fontStyle: 'italic', fontSize: "15px" }} className='section'>
                    Processing Section......
                </span>)
                
                )}

            </div>
            {full_exist ?  
                <div className='full-book'>
                    <Section 
                    name={"Full book"}
                    audioUrl={fullBookUrl}
                    />
                </div>
                :
                <span style={{ fontStyle: 'italic', fontSize: "15px" }} className='section'>
                    Processing Full Book......
                </span>
                
                }

        </div>
        
    )
}

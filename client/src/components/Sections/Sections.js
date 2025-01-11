import React from 'react'
import './Sections.css'
import Section from '../Section/Section'

export default function Sections({name, download, play}){
    return(
        <div className='sections'>
            <Section 
                name={name}
                download={download}
                play={play}
            />
        </div>
        
    )
}

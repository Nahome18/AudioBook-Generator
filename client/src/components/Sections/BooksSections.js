import React, { useState, useEffect } from 'react'
import './Sections.css'
import Section from '../Section/Section'
import FetchFullBookUrl from '../Methods/FetchFullBookUrl';
import BooksSection from '../Section/BooksSection';
import { Link } from 'react-router-dom';

export default function BooksSections({books}){

    return(
        <div className='sections' >
            <div className='content'>
                {books? books.map((book) => 
                <BooksSection book={book}/>

            ):<span style={{ fontStyle: 'italic', fontSize: "15px" }} className='section'>
            No books
        </span>
        }

            </div>

        </div>
        
    )
}

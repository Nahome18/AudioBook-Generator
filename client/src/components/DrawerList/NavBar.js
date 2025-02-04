import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Pages/Pages.css'

export default function NavBar(){
    const navigate = useNavigate()
    return (
        <h1 onClick={()=>navigate('/')} className='nav-bar'>NavBar goes here</h1>
    )
}

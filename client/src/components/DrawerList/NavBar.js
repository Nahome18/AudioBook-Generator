import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavBar(){
    const navigate = useNavigate()
    return (
        <h1 onClick={()=>navigate('/')}>NavBar goes here</h1>
    )
}

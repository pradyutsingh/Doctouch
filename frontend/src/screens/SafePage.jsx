import React from 'react'
import { Link } from 'react-router-dom'

function SafePage() {
    return (
        <div>
            Congrats You are safe!!
            <Link to = "/">Go to home</Link>
        </div>
    )
}

export default SafePage

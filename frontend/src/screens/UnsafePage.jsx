import React from 'react'
import { Link } from 'react-router-dom'

function UnsafePage() {
    return (
        <div>
            You are not safe
            <Link to = "/">Go to home</Link>
        </div>
    )
}

export default UnsafePage

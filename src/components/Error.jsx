import React from 'react'
import './style/error.css'


const Error = () => {
    const refresh = () => {
        window.location.reload()
    }

    return (
        <div className='error'>
            <div>
                <p>sorry something went wrong</p>
                <button onClick={refresh}>try again</button>
            </div>
        </div>
    )
}

export default Error

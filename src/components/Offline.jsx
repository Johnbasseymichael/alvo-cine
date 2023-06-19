import React, { useState } from 'react'
import './style/offline.css'
const Offline = () => {
  const [open, setOpen] = useState(true)


  return (
    open && (<div className='offline'>
      <div>
        <p>you are currently offline</p>
        <p>check your internet connection and try again</p>
        <button onClick={() => setOpen(!open)}>close</button>
        <button onClick={() => window.location.reload()}>try again</button>  
      </div>
    </div>)
  )
}

export default Offline

import React, { useState } from 'react';
import './style/offline.css';

const Offline = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <>
    <div className='offline-wrapper'>

    <div className="offline">
      <p>You are currently offline</p>
      <p>Some features may not work</p>
      <p>Check your internet connection and try again</p>
      <button className='close' onClick={() => setOpen(false)}>Close</button>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
    </div>
    </>
  );
};

export default Offline;
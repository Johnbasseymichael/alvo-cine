import React, { useState } from 'react'
import './style/togglebtn.css'


const ToggleBtn = (props) => {
    const [isToggled, setIsToggled] = useState(false)


    const handleToggle = () => {
        setIsToggled(prev => !prev);
        props.handleToggle();
    }
    return (
        <div onClick={handleToggle} className='toggle-btn' >
            <div className={`toggler ${isToggled && 'toggled'}`}></div>
        </div>

    )
}

export default ToggleBtn

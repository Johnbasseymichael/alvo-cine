import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import './style/togglebtn.css'


const ToggleBtn = (props) => {
    const {lightTheme, setLightTheme } = useContext(ThemeContext)


    const handleToggle = () => {
        setLightTheme(prev => !prev);
    }
    return (
        <div onClick={handleToggle} className='toggle-btn' >
            <div className={`toggler ${lightTheme && 'toggled'}`}></div>
        </div>

    )
}

export default ToggleBtn

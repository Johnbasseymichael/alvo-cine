import { createContext, useState } from "react";


export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false)

    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
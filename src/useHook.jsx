import { useState } from "react"


export const useHook = (initialVal = false, count ) => {
    const [state, setState] = useState(initialVal)
    const [mycount, setmc] = useState(count)

    const toggle = () => {
        setState(prev => !prev)
    }

    const incrementCount = () => {
       setmc(prev => prev + 1)
    }
    

    return [state, toggle, mycount, incrementCount]
}
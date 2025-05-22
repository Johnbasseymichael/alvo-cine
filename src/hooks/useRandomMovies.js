// hooks/useRandomMovies.js
import { useEffect, useState } from "react";

const useRandomMovies = (movieArray, count = 5) => {
    const [randomMovies, setRandomMovies] = useState([]);

    useEffect(() => {
        if (movieArray?.length > 0) {
            const shuffled = [...movieArray];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setRandomMovies(shuffled.slice(0, count));
        }
    }, [movieArray, count]);

    return randomMovies;
};

export default useRandomMovies;

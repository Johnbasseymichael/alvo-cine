import { createContext, useState } from "react";

// export const SearchContext = createContext();

// export const SearchContextProvider = ({ children }) => {
//     const [searchInput, setSearchInput] = useState("");

//     return (
//         <SearchContext.Provider value={{ searchInput, setSearchInput }}>
//             {children}
//         </SearchContext.Provider>
//     );
// };
// SearchContext.jsx
export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("multi"); // "movie", "tv", or "multi"

    return (
        <SearchContext.Provider value={{
            searchInput,
            setSearchInput,
            searchType,
            setSearchType,
        }}>
            {children}
        </SearchContext.Provider>
    );
};

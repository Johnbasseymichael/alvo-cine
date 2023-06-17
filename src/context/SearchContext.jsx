import { createContext, useState } from "react";



export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState('')

    return (
        <SearchContext.Provider value={{ searchInput, setSearchInput }}>
            {children}
        </SearchContext.Provider>
    )


}

// const randomImg = () => {
//     return Math.floor(Math.random() * 20)
// }

// const { data: movies, isLoading, isError } = useQuery(['getmovies', isSearch], async () => {
//     const options = {
//         method: 'GET',
//         url: `https://api.themoviedb.org/3/${isSearch}/movie?page=1`,
//         params: {
//             api_key: 'a98f11406964621231f7866e1257a45e',
//             query: searchInput
//         },
//     };
//     try {
//         const response = await axios.request(options);
//         return response.data.results;
//     } catch (error) {
//         console.error(error);
//     }
// })


// if (isLoading) return <div>loding</div>
// if (isError) return <div>errorrrrrrrrrrrrr</div>

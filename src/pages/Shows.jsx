import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import { SearchContext } from '../context/SearchContext'

const Shows = () => {
  const { searchInput } = useContext(SearchContext)
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const isSearch = searchInput ? 'search' : 'discover';

  const [page, setPage] = useState(1)
  const pageNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


  const getShow = async () => {
    document.title = 'TV Shows'
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${isSearch}/tv?page=${page}`,
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        query: searchInput
      },
    };
    await axios.request(options).then((response) => {
      setShows(response.data.results);
    }).catch(function (error) {
      setIsError(true)
      isLoading(false)
      console.error(error);
    });
  }
  useEffect(() => {
    getShow()
  }, [searchInput, page])

  // if (isLoading) return <div>Loading</div>
  if (isError) return <div>erroorr</div>



  const randomImg = (arrr) => {
    return Math.floor(Math.random() * arrr.length)
  }

  // console.log(shows);


  return (
    <div className='movies'>
      <Banner showSearchBar={true} bannerImage={shows[randomImg(shows)]} />
      <MovieList getMovies={shows} />

      <div className="pages-btn">
        {pageNum.map((num) => {
          return <button key={num} onClick={() => setPage(num)}>{num}</button>
        })}
      </div>
    </div>
  )
}

export default Shows

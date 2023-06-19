import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Error from '../components/Error'
import MovieList from '../components/MovieList'
import { SearchContext } from '../context/SearchContext'

const Shows = () => {
  const { searchInput } = useContext(SearchContext)
  const [shows, setShows] = useState([])
  const [isError, setIsError] = useState(false)
  const isSearch = searchInput ? 'search' : 'discover';

  const [page, setPage] = useState(1)

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
      console.error(error);
    });
  }
  useEffect(() => {
    getShow()
  }, [searchInput, page])

  const randomImg = (arrr) => {
    return Math.floor(Math.random() * arrr.length)
  }


  const nextPage = () => {
    setPage(page + 1)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const prevPage = () => {
    setPage(page - 1)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  if (isError) return <Error />

  return (
    <div className='movies'>
      <Banner showSearchBar={true} bannerImage={shows[randomImg(shows)]} />
      <MovieList parentPath={'shows/'} getMovies={shows} />



      <>
        <div className="pages-btn">
          {page > 1 && <button onClick={prevPage}>prev</button>}
          <button onClick={nextPage}>next</button>
        </div>
        <div className="page-number">page = {page}</div>
      </>
    </div>
  )
}

export default Shows

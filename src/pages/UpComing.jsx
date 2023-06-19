import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import Banner from '../components/Banner'
import Error from '../components/Error'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'

const UpComing = () => {
  const [page, setPage] = useState(1)

  const { data: upcoming, isError, isLoading } = useQuery(['get upcoming', page], async () => {
    document.title = 'Up Coming'

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/upcoming?page=${page}`,
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      }
    };

    try {
      const res = await axios.request(options)
      return res.data.results
    } catch (error) {
      console.error(error);
    };
  })


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


  if (isLoading) return <Loading />
  if (isError) return <Error />
  return (
    <div>
      <Banner showSearchBar={false} bannerImage={upcoming && upcoming[randomImg(upcoming)]} />
      <MovieList parentPath={'upcoming/'} getMovies={upcoming} />


      {upcoming[0] && <>
        <div className="pages-btn">
          {page > 1 && <button onClick={prevPage}>prev</button>}
          <button onClick={nextPage}>next</button>
        </div>
        <div className="page-number">page = {page}</div>
      </>}
    </div>
  )
}

export default UpComing

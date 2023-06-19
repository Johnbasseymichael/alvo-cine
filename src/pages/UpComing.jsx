import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import Banner from '../components/Banner'
import Error from '../components/Error'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'

const UpComing = () => {
  const [page, setPage] = useState(1)
  const pageNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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


  if (isLoading) return <Loading />
  if (isError) return <Error />
  return (
    <div>
      <Banner showSearchBar={false} bannerImage={upcoming && upcoming[randomImg(upcoming)]} />
      <MovieList getMovies={upcoming} />

      <div className="pages-btn">
        {pageNum.map((num) => {
          return <button key={num} onClick={() => setPage(num)}>{num}</button>
        })}
      </div>

    </div>
  )
}

export default UpComing

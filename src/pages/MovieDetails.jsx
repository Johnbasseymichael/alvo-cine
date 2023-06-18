import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import FilmDetails from '../components/FilmDetails';


const MovieDetails = () => {
  const { movieId } = useParams();



  const { data, isError, isLoading } = useQuery(['get movie details', movieId], async () => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });





  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>

  return (
    <FilmDetails movieDetails={data}  />
  )
}

export default MovieDetails
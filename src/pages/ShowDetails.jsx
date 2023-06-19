import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';

const ShowDetails = () => {
  const { movieId } = useParams();

  const { data: show, isError, isLoading } = useQuery(['get movie details', movieId], async () => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${movieId}`,
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
  console.log(show);





  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <div className='show-details'>
      {show.name}
    </div>
  )
}

export default ShowDetails

import React from 'react'
import { useParams } from 'react-router-dom';

const ShowDetails = () => { 
     const { movieId } = useParams();

  return (
    <div>
      {movieId}dfadsfasdf
    </div>
  )
}

export default ShowDetails

import { useState, useEffect } from 'react'
import './App.css'
import movies from './afi_list.json'


function App() {
  const [watched, setWatched] = useState(0)

  const onClick = (e)=>{
    if(e.target.checked){
      setWatched(watched+1)
    } else {
      setWatched(watched-1)
    }
  }

  const movieList = movies.map((movie, m)=>{
    const movieKey = `movie-${m}`
    const inputKey = `input-${m}`
    const labelKey = `label-${m}`
    return (
      <li key={movieKey}>
        <input 
          type="checkbox" 
          id={inputKey}
          name={inputKey}
          key={inputKey}
          onClick={onClick}
        />
        <label 
          htmlFor={inputKey}
          key={labelKey}
        >
          <span>{movie.rank}.</span>
          <span>{movie.title}</span> 
        </label>
      </li>
    )
  })
  return (
    <>
      <div className="header">
        <span className={'counter'}>{ watched }</span> 
        <span className={'title'}>AFI Top 100 Movies</span>
      </div>
      <ul>
        {movieList}
      </ul>
      <div className="header">
        <span className={'counter'}>{ watched }</span> 
        <span className={'title'}>AFI Top 100 Movies</span>
      </div>
    </>
  )
}

export default App

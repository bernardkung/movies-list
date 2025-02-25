import { useState, useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import './App.css'
import movies from './afi_list.json'


function App() {
  const [watchList,setWatchList] = useState([])
  const [cookies, setCookie] = useCookies(['watched'])

  function updateList(item, list) {
    if (list.includes(item)) {
      return list.filter(i => i != item)
    }
    return [...list, item]
  }

  function updateCookie (watched) {
    setCookie('watched', watched, { path: '/' })
  }

  const onClick = (e)=>{
    const uList = updateList(e.target.value, cookies.watched)
    updateCookie(uList)
    setWatchList(uList)
  }


  useEffect(()=>{
    // console.log('cookie')
  }, [cookies])

  const movieList = movies.map((movie, m)=>{
    const inputKey = `${m}`
    return (
      <CookiesProvider key={`c${m}`}>
        <li key={`m${m}`}>
          <input 
            type="checkbox" 
            id={inputKey}
            name={inputKey}
            key={inputKey}
            onChange={onClick}
            value={movie['rank']}
            checked={cookies.watched.includes(movie['rank'].toString())}
            // checked={true}
          />
          <label 
            htmlFor={inputKey}
            key={`l${m}`}
          >
            <span key={`r${m}`}>{movie.rank}.</span>
            <span key={`t${m}`}>{movie.title}</span> 
          </label>
        </li>
      </CookiesProvider>
    )
  })

  return (
    <>
      <div className="header">
        <span className={'counter'}>{ cookies.watched.length }</span> 
        <span className={'title'}>AFI Top 100 Movies</span>
      </div>
      <ul>
        {movieList}
      </ul>
      <div className="header">
        <span className={'counter'}>{ cookies.watched.length }</span> 
        <span className={'title'}>AFI Top 100 Movies</span>
      </div>
    </>
  )
}

export default App

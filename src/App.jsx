import { useState, useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import './App.css'
import movies from './afi_list.json'


function App() {
  const [cookies, setCookie] = useCookies(['watched'])
  const [watchList, setWatchList] = useState([])

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
    const uList = updateList(e.target.value, watchList)
    setWatchList(uList)
  }

  function onSubmit (e) {
    e.preventDefault()
    console.log(e.target.id)
  }

  useEffect(()=>{
    // Update cookie
    updateCookie(watchList)
  }, [watchList])

  useEffect(()=>{
    // Initialize watchList
    if (cookies.watched) {
      setWatchList(cookies.watched)
    }
  }, [])

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
            checked={watchList.includes(movie['rank'].toString())}
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
        <span className={'counter'}>{ watchList.length }</span> 
        <span className={'title'}>AFI Top 100 Movies</span>
      </div>

      <ul>
        {movieList}
      </ul>

      <form className={'consentForm'}>
        <p>This site uses a cookie to retain progress between visits, no other data is tracked. No data is shared.</p>
        <div className={'buttonBar'}>
          <button 
            className={'acceptButton'} 
            id={'acceptButton'} 
            onClick={onSubmit}
          >
            Accept Cookie
          </button>
          <button 
            className={'rejectButton'} 
            id={'acceptButton'} 
            onClick={onSubmit}
          >
            Reject Cookie
          </button>

        </div>
      </form>

      <div className="header">
        <span className={'counter'}>{ watchList.length }</span> 
        <span className={'title'}>AFI Top 100 Movies</span>
      </div>
    </>
  )
}

export default App

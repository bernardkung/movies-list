import { useState, useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import './App.css'
import movies from './afi_list.json'


function App() {
  const [watchList, setWatchList] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [consent, setConsent] = useState(false)
  const [showConsent, setShowConsent] = useState(true)


  function updateList(item, list) {
    if (list.includes(item)) {
      return list.filter(i => i != item)
    }
    return [...list, item]
  }

  function updateCookie (watched) {
    if (consent) {
      setCookie('watched', watched, { path: '/' })
    }
  }

  function updateConsentCookie (consented) {
    if (consented) {
      setCookie('consented', consented, { path: '/'})
    }
  }

  const onChange = (e)=>{
    const uList = updateList(e.target.value, watchList)
    setWatchList(uList)
  }

  function onClick (e) {
    e.preventDefault()
    if (e.target.id==="acceptButton") {
      setConsent(true)
    }
    setShowConsent(false)
  }

  useEffect(()=>{
    // Update watch cookie
    updateCookie(watchList)
  }, [watchList])

  useEffect(()=>{
    if (!consent) {
      removeCookie('watched')
      removeCookie('consented')
    }
    updateCookie(watchList)
    updateConsentCookie(consent)
  }, [consent])

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
            onChange={onChange}
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

      <form className={`consentForm ${showConsent && !consent ? '' : 'hidden'}`}>
        <p>This site uses a cookie to retain progress between visits, no other data is tracked. No data is shared.</p>
        <div className={'buttonBar'}>
          <button 
            className={'acceptButton'} 
            id={'acceptButton'} 
            onClick={onClick}
          >
            Accept Cookie
          </button>
          <button 
            className={'rejectButton'} 
            id={'acceptButton'} 
            onClick={onClick}
          >
            Reject Cookie
          </button>
        </div>
      </form>

      <div className={'footer'}>
        <p>Built by <a href='https://bernardkung.github.io/'>Bernard Kung</a></p>
        <p>Icons are open-source <a href="https://www.iconshock.com/freeicons/collection/primeicons">primeicons</a> from Iconshock</p>
      </div>


    </>
  )
}

export default App

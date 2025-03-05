import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import './App.css'
import movies from './afi_list.json'
import cogIcon from './assets/icons/sliders.svg'


function App() {
  const [watchList, setWatchList] = useState([])
  const [consent, setConsent] = useState(false)
  const [showConsent, setShowConsent] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  
  ////// FUNCTIONS
  function updateList(item, list) {
    console.log(item, list)
    if (list.includes(item)) {
      return list.filter(i => i != item)
    }
    return [...list, item]
  }

  function updateWatchedCookie () {
    if (consent) {
      Cookies.set('watched', watchList)
    }
  }

  function destroyAllCookies() {
    Cookies.remove('consented')
    Cookies.remove('watched')
  }

  function updateConsentCookie () {
    if (consent) {
      Cookies.set('consented', consent)
    } 
  }

  ////// LISTENERS
  function onChange (e) {
    const uList = updateList(e.target.value, watchList)
    setWatchList(uList)
  }

  function onButtonClick (e) {
    e.preventDefault()
    setShowConsent(false)
    if (e.target.value) {
      setConsent(true)
    } 
  }

  function onToggle(e) {
    // If consent setting set directly from settings while ignoring bottom popup
    if (showConsent) {
      setShowConsent(false)
    }
    // Toggle consent
    setConsent(!consent)
  }

  function toggleSettings (e) {
    setShowSettings(!showSettings)
  }

  ////// EFFECTS
  useEffect(()=>{
    // Update watch cookie\
    updateWatchedCookie()
  }, [watchList])

  // useEffect(()=>{
  //   console.log('consent effect', consent)
  //   if (!consent) {
  //     destroyAllCookies()
  //   }
  //   updateWatchedCookie()
  //   updateConsentCookie()
  // }, [consent])

  useEffect(()=>{
    const allCookies = Cookies.get()
    console.log('all:', allCookies)
    // Initialize watchList
    if (Cookies.get('watched')) {
      setWatchList(Cookies.get('watched'))
    }
    // If not consented, show popup
    if (!Cookies.get('consented')) {
      setShowConsent(true)
    }
  }, [])


  ////// DIVS
  const movieList = movies.map((movie, m)=>{
    const inputKey = `${m}`
    return (
      <li key={`m${m}`}>
        <input 
          type="checkbox" 
          id={inputKey}
          name={inputKey}
          key={inputKey}
          className={'movieCheckbox'}
          onChange={onChange}
          value={movie['rank']}
          checked={watchList.includes(movie['rank'].toString())}
        />
        <label 
          className={'movieLabel'}
          htmlFor={inputKey}
          key={`l${m}`}
        >
          <span key={`r${m}`}>{movie.rank}.</span>
          <span key={`t${m}`}>{movie.title}</span> 
        </label>
      </li>
    )
  })

  
  ////// MAIN
  return (
    <>

      <div className={'header'}>
        <span className={'counter'}>{ watchList.length }</span> 
        <span className={'title'}>AFI Top 100 Movies</span>
        <img className={'settingsIcon'} src={cogIcon} onClick={toggleSettings}/>
      </div>

      <div className={`settings ${showSettings ? '' : 'hidden'}`}>
        <span className={'settingsSpan'}>
          <label htmlFor={'cookieSettings'} >
            Accept Cookies
          </label>
          <input 
            name={'cookieSettings'} 
            type={'checkbox'} 
            checked={consent}
            value={consent}
            onChange={onToggle}
          />
        </span>
      </div>

      <ul>
        {movieList}
      </ul>

      <form className={`consentForm ${!showConsent ? 'hidden' : ''}`}>
        <p>This site uses a cookie to retain progress between visits, no other data is tracked. No data is shared.</p>
        <div className={'buttonBar'}>
          <button 
            className={'acceptButton'} 
            id={'acceptButton'} 
            value={true}
            onClick={onButtonClick}
          >
            Accept Cookie
          </button>
          <button 
            className={'rejectButton'} 
            id={'rejectButton'} 
            value={false}
            onClick={onButtonClick}
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

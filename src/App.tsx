// Styles
import './App.css'

// Context
import { APIProvider } from './context/APIContext'

// Component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './route/Home';
import Stone from './route/Stone';

// 설정 파일
import axios from 'axios'
import config from './config'

// React
import { useEffect } from 'react'

// Context
import { useAPIState, useAPIDispatch } from './context/APIContext'
import { useHeaderDispatch, useHeaderState } from './context/HeaderContext';
import ScrollToTop from './context/ScrollTop';


function App() {
  ////// API 일괄 데이터 //////
	//const state    = useAPIState()
	const dispatch = useAPIDispatch()

  // 데이터 조회 함수
  const getBatchData = async () => {
    try {
      dispatch({ type: 'LOADING' })
      const service  = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service`)
      const category = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/category`)
      const stack    = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/stack`)

      setTimeout( async function() {
        try {
          dispatch({ type: 'SUCCESS', service: service.data, category: category.data, stack: stack.data })
        } catch (err) {
          console.log(err)
        }
      }, 1 * 1000)
    } catch (e) {
      dispatch({ type: 'ERROR', error: e })
    }
  }

  useEffect(() => {
    getBatchData()
  }, [])


  const heightState    = useHeaderState()
	const heightDispatch = useHeaderDispatch()
  useEffect(() => window.addEventListener('scroll', updateScroll) )
  
  const updateScroll = () => heightDispatch({ type: 'UPDATE', scrollPosition: window.scrollY || document.documentElement.scrollTop })

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/stone' element={<Stone />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Context
import Header from '../component/Header'
import Footer from '../component/Footer'

// 설정 파일
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserDispatch, useUserState } from '../context/UserContext'


// 설정 파일
import axios from 'axios'
import config from '../config'

import { useCookies } from 'react-cookie'
import Manaegment from '../component/Management'

function Admin() {
    const navigate = useNavigate()
    
    const userState    = useUserState()
    const userDispatch = useUserDispatch()
 
    const { loading, token } = userState

    // 인증
    useEffect(() => {
        console.log(loading)
        console.log(token)
        if(!loading && !token) {
            alert('로그인 이후 접근해주시기 바랍니다.')
            navigate('/login')
        }
    }, [loading])

    if( loading ) { return null }
    if( !token ) { return null }
    return (
        <>
            <div>
                <Header />
                <Manaegment />
                <Footer />
            </div>
        </>
    )
}
export default Admin
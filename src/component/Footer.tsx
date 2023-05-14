// 설정 파일
import axios from 'axios'
import config from '../config'

// React
import { useState } from 'react'
import { Link } from 'react-router-dom';

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useUserDispatch, useUserState } from '../context/UserContext'

// Style
import styles from './Footer.module.css'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCookies } from 'react-cookie'

function Footer() {
    const navigate = useNavigate()

    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    ////// 유저 일괄 데이터 //////
    const userState    = useUserState()
    const userDispatch = useUserDispatch()

    const { token }    = userState

    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    async function logout() {
        userDispatch({ type: 'LOGOUT' })

        const auth  = await axios.post(`https://${config.CALCS_HOST}:${config.CALCS_BE}/auth`, {}, { headers: {Authorization: `Bearer ${cookies.token}`}})

        removeCookie('token')
        userDispatch({ type: 'EXPIRY' })

        alert('로그아웃 되었습니다.')
        navigate('/')
    }

    function login() {
        navigate('/login')
    }

    return (
        <footer>
            <div className={ styles.footer_frame }>
                <div className={[ styles.footer_item, styles.footer_item_logo ].join(' ')}>
                    <div className={ styles.footer_item__logo }>
                        <Link className={ styles.footer_item__img } to='/admin'></Link>
                        <span>CALCS</span>
                    </div>

                    <div>
                        <span>ⓒ 2022 reasley</span>
                    </div>
                </div>

                <div className={[ styles.footer_item, styles.footer_item_terms ].join(' ')}>
                    <span onClick={ token ? logout : login }>{ token ? '로그아웃' : '로그인' }</span>
                    <span>이용약관</span>
                    <span>개인정보처리방침</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
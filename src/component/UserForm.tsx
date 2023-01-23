// React
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// 설정 파일
import axios from 'axios'
import config from '../config'

// Style
import styles from './UserForm.module.css';

import { useCookies } from 'react-cookie'
import { useUserDispatch, useUserState } from '../context/UserContext';

function UserForm() {
    // URL 컨트롤러
    const navigate = useNavigate()

    // 쿠키 컨트롤러
    const [cookies, setCookie] = useCookies(['token'])

    ////// API 일괄 데이터 //////
	const state    = useAPIState()
	const dispatch = useAPIDispatch()

	// 조회된 데이터 정의
	// const { loading, service, category, stack, error } = state

    ////// 유저 일괄 데이터 //////
    const userState    = useUserState()
    const userDispatch = useUserDispatch()
    const { loading, token }    = userState

    // 로그인 정보 입력 폼
    const [userID, setUserID]             = useState('')
    const [userPassword, setUserPassword] = useState('')

    // 로그인 정보 입력 이벤트 감지
    const onChange = (event: any) => {
        const type = event.target.id

        if( type === 'user_id' )       setUserID(event.target.value)
        if( type === 'user_password' ) setUserPassword(event.target.value)
    }

    // 로그인 수행
    const userformHandler = async () => {
        // 쿠키 만료기간 날짜
        const now          = new Date()
        const afterOneHour = new Date(now.setHours(now.getHours() +1))

        try {
            userDispatch({ type: 'LOGIN' })

            const login  = await axios.post(`http://${config.CALCS_HOST}:${config.CALCS_BE}/auth/login`, {
                userName: userID,
                userPassword: userPassword,
            })

            if( login.data.status === 200 ) {
                setCookie('token', login.data.result, {
                    path: '/',
                    expires: afterOneHour,
                    secure: true,
                    // httpOnly: true
                })
                userDispatch({ type: 'SUCCESS', token: login.data.result })
                navigate('/')
            } else {
                userDispatch({ type: 'EXPIRY' })
                alert('잘못된 로그인 정보입니다.')
            }
        } catch (e) {
            userDispatch({ type: 'EXPIRY' })
        }
    }


    // 인증
    useEffect(() => {
        if(!loading && token) {
            navigate('/admin')
        }
    }, [loading])

    if( loading ) { return null }
    if( token ) { return null }

    return (
        <div className={ styles.userform_frame }>
            <div className={[ styles.userform__item, styles.userform__item_title ].join(' ')}>
                <span className={ styles.userform__item_title_text }>로그인</span>
            </div>

            <form action='#' onSubmit={ userformHandler } className={ styles.userform_item }>
                <div className={[ styles.userform__item, styles.userform__item_form ].join(' ')}>
                    <div className={ styles.userform__item_form_single }>
                        <input id='user_id' onChange={ onChange } value={ userID }  placeholder='아이디를 입력하세요'></input>
                    </div>

                    <div className={ styles.userform__item_form_single }>
                        <input id='user_password' onChange={ onChange } value={ userPassword } type='password' placeholder='비밀번호를 입력하세요'></input>
                    </div>
                </div>

                <div className={[ styles.userform__item, styles.userform__item_action ].join(' ')}>
                    <div className={ styles.userform__item__action }>
                        <input id='save' type='checkbox'></input>
                        <label htmlFor='save'>로그인 상태 유지</label>
                    </div>

                    <div className={ styles.userform__item__action }>
                        <Link to='/' className={ styles.userform__item__action_link }>아이디 </Link>
                        <span>/</span>
                        <Link to='/' className={ styles.userform__item__action_link }> 비밀번호 변경</Link>
                    </div>
                </div>

                <div className={[ styles.userform__item, styles.userform__item_login ].join(' ')}>
                    <button type='submit' className={ styles.userform__item__button }>로그인</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm
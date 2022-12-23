// React
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './Header.module.css';

function Header() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    return (
        <header>
            <div className={ styles.header_frame }>
                <div className={ styles.header_item }>
                    <img src='/img/logo.png' alt='' />
                    <span className={ styles.header_item__text }>CALCS</span>
                </div>

                <div className={ styles.header_item }>
                    <Link to='/' className={ styles.header_item__text }>홈</Link>
                    <Link to='/stone' className={ styles.header_item__text }>스톤</Link>
                    <a href='https://reasley.com' className={ styles.header_item__text }>블로그</a>
                </div>
            </div>
        </header>
    )
}

export default Header
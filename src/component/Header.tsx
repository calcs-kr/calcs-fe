// React
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useHeaderDispatch, useHeaderState } from '../context/HeaderContext';
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './Header.module.css';

function Header(props : { defaultColor?: string }) {
    ////// API 일괄 데이터 //////
	const state    = useAPIState()
	const dispatch = useAPIDispatch()

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    const heightState    = useHeaderState()
	const heightDispatch = useHeaderDispatch()

    const { scrollPosition } = heightState

    return (
        <header className={ scrollPosition < 50 ? ( props?.defaultColor === 'white' ? styles.white : styles.black ) : styles.header_scroll }>
            <div className={[ styles.header_frame ].join(' ')}>
                <div className={ styles.header_item }>
                    <div className={ styles.header_item__img }></div>
                    <Link to='/' className={ styles.header_item__text }>CALCS</Link>
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
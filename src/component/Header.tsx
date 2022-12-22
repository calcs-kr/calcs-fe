// React
import { useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './Header.module.css';
import { Link } from 'react-router-dom'

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
                    <span>CALCS</span>
                </div>

                <div className={ styles.header_item }>
                    <span>홈</span>
                    <span>스톤</span>
                    <span>블로그</span>
                </div>
            </div>
        </header>
    )
}

export default Header
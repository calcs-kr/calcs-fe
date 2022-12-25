// React
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useHeaderDispatch, useHeaderState } from '../context/HeaderContext';
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './Header.module.css';

function Header(props : { scrollMotion?: boolean }) {
    ////// API 일괄 데이터 //////
	const state    = useAPIState()
	const dispatch = useAPIDispatch()

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    const heightState    = useHeaderState()
	const heightDispatch = useHeaderDispatch()

    const { scrollPosition } = heightState


    // 스크롤에 따른 css 변경
    //const [scrollPosition, setScrollPosition] = useState(0);
    //const updateScroll = () => setScrollPosition(window.scrollY || document.documentElement.scrollTop)
    //useEffect(() => window.addEventListener('scroll', updateScroll) )

    return (
        <header className={ scrollPosition < ( props?.scrollMotion ? 100 : 0 ) ? styles.header_original : styles.header_change }>
            <div className={[ styles.header_frame ].join(' ')}>
                <div className={ styles.header_item }>
                    <div className={ styles.header_item__img }></div>
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
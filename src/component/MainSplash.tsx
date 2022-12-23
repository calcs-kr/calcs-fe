// React
import { useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './MainSplash.module.css';
import { Link } from 'react-router-dom'

function MainSplash() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    return (
        <div className={ styles.mainsplash_frame }>
            <div className={ styles.mainsplash_item }>
                <span className={ styles.mainsplash_item__title }>STONE</span>
                <span className={ styles.mainsplash_item__subhead }>"나"라는 개발자가 되기 위해 쌓은 프로젝트 모음</span>

                <span className={ styles.mainsplash_item__text }>여러 돌을 쌓아 하나의 거대한 산을 만들고 있습니다.</span>
                <span className={ styles.mainsplash_item__text }>프로젝트가 등록될 때 마다 사용자 만큼의 돌이 생겨납니다.</span>
            </div>
        </div>
    )
}

export default MainSplash
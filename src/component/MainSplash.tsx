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
            <div>
                <span>STONE</span>
            </div>
        </div>
    )
}

export default MainSplash
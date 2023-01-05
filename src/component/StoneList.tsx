// React
import { useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './StoneList.module.css';
import { Link } from 'react-router-dom'

function StoneList() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    const a = [1,2,3,4]
    return (
        <div className={ styles.stonelist_frame }>
            <div className={[ styles.stonelist_item, styles.stonelist_item_title ].join(' ')}>
                <span className={ styles.stonelist_item__title }>다양한 스케치를 살펴보고</span>
                <span className={ styles.stonelist_item__title }>진행될 프로젝트에 대해 확인해보세요</span>
                <span className={ styles.stonelist_item__subhead }>02월 이후 스톤을 사용하시면 새로운 스톤을 다운로드 받을 수 있습니다</span>
            </div>

            <div className={[ styles.stonelist_item, styles.stonelist_item_stone ].join(' ')}>
                { a.map((item) => (
                    <div className={ styles.stonelist_item__stone } key={ item }>
                        <img className={ styles.stonelist_item__stone_img } src='/img/stone.png' alt='' />
                        <span className={ styles.stonelist_item__stone_name }>Amethyst</span>
                        <span className={ styles.stonelist_item__stone_date }>2022.12.04</span>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default StoneList
// React
import { useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './MountainList.module.css';

function MountainList() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    return (
        <div className={ styles.mountainlist_frame }>
            <div className={[ styles.mountainlist_item ].join(' ')}>
                <div className={ styles.mountainlist_item_title }>
                    <span className={ styles.mountainlist_item__title }>다양한 산을 구경해보고</span>
                    <span className={ styles.mountainlist_item__title }>여러 아이디어를 확인보세요</span>
                    <span className={ styles.mountainlist_item__subhead }>산은 여러 팀원들이 힘을 합친 거대한 프로젝트를 의미합니다</span>
                </div>

                <div className={ styles.mountainlist_item_arrow }>
                    <img src='/img/arrow.png' alt='' />
                </div>
            </div>

            <div className={[ styles.mountainlist_item, styles.mountainlist_item_mountain ].join(' ')}>
                <div className={ styles.stonelist_item__mountain }>
                    <img src='/img/mountaine1.png' alt='' />
                </div>

                <div className={ styles.stonelist_item__mountain }>
                    <img src='/img/mountaine2.png' alt='' />
                </div>

                <div className={ styles.stonelist_item__mountain }>
                    <img src='/img/mountaine3.png' alt='' />
                </div>
            </div>
        </div>
    )
}

export default MountainList
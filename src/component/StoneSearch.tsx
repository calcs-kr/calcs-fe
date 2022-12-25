// React
import { useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Style
import styles from './StoneSearch.module.css';

function StoneSearch() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    const a = [1,2,3,4,5,6,7,8,9,10,11,12]

    return (
        <div className={ styles.stonekey_frame }>
            <div className={[ styles.stonekey_item, styles.stonekey_item_head ].join(' ')}>
                <span>STONE</span>
                <div className={ styles.stonekey_item__search }>
                    <input placeholder='search' />
                    <img src='/icon/search.png' alt='' />
                </div>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_category ].join(' ')}>
                { a.map((item) => (
                    <div key={ item }>
                        <span>Calc</span>
                        <span>1</span>
                    </div>
                )) }
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_body ].join(' ')}>
                { a.map((item) => (
                    <div className={ styles.stonekey_item__stone } key={ item }>
                        <div>
                            <img src='/img/stone.png' alt='' />

                            <span className={ styles.stonekey_item__stone_category }>CALC</span>
                            <span className={ styles.stonekey_item__stone_title }>퍼센트 계산기</span>
                            <span className={ styles.stonekey_item__stone_describe }>퍼센트 계산을 간단하게 수행할 수 있도록 구성된 사이트로 기본적인 퍼센트, 비율, 값 계산이 가능한 사이트로 아주 간단한 프로젝트</span>
                        </div>

                        <div>
                            <span className={ styles.stonekey_item__stone_uptime }>4 hours age</span>
                        </div>
                    </div>
                )) }
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_pagenation ].join(' ')}>
                <div className={ styles.stonekey_item__img }>
                    <div className={[ styles.icon_left ].join(' ')}></div>
                </div>
                { a.map((item) => (
                    <span key={item}>{item}</span>
                )) }
                <div className={ styles.stonekey_item__img }>
                    <div className={[ styles.icon_right ].join(' ')}></div>
                </div>
            </div>
        </div>
    )
}

export default StoneSearch
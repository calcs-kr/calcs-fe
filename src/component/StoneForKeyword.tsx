// React
import { useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Style
import styles from './StoneForKeyword.module.css';

function StoneForKeyWord() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    const a = [1,2,3,4,5,6,7,8]

    return (
        <div className={ styles.stonekey_frame }>
            <div className={[ styles.stonekey_item, styles.stonekey_item_title ].join(' ')}>
                <span className={ styles.stonekey_item__title }>키워드 별 스톤</span>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_tag ].join(' ')}>
                <div>
                    <span>All</span>
                    <span>Adobe XD</span>
                    <span>React</span>
                    <span>Javascript</span>
                    <span>Typescript</span>
                </div>
                
                <div>
                    <span>Node.js</span>
                    <span>Docker</span>
                    <span>Express</span>
                    <span>Nginx</span>
                </div>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_stone ].join(' ')}>
                { a.map(() => (
                    <div className={ styles.stonekey_item__stone }>
                        <div>
                            <img src='/img/stone.png' alt='' />

                            <span className={ styles.stonelist_item__stone_category }>CALC</span>
                            <span className={ styles.stonelist_item__stone_title }>퍼센트 계산기</span>
                            <span className={ styles.stonelist_item__stone_describe }>퍼센트 계산을 간단하게 수행할 수 있도록 구성된 사이트로 기본적인 퍼센트, 비율, 값 계산이 가능한 사이트로 아주 간단한 프로젝트</span>
                        </div>
                        
                        <div>
                            <span className={ styles.stonelist_item__stone_uptime }>4 hours age</span>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default StoneForKeyWord
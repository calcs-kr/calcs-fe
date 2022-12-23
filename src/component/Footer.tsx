// React
import { useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Style
import styles from './Footer.module.css';

function Footer() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    return (
        <footer>
            <div className={ styles.footer_frame }>
                <div className={[ styles.footer_item, styles.footer_item_logo ].join(' ')}>
                    <div className={ styles.footer_item__logo }>
                        <img src='/img/logo.svg' alt='' />
                        <span>CALCS</span>
                    </div>

                    <div>
                        <span>ⓒ 2022 reasley</span>
                    </div>
                </div>

                <div className={[ styles.footer_item, styles.footer_item_terms ].join(' ')}>
                    <span>위젯</span>
                    <span>이용약관</span>
                    <span>개인정보처리방침</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
// 설정 파일
import axios from 'axios'
import config from '../config'

// React
import { useEffect, useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './Header.module.css';
import { Link } from 'react-router-dom'
import { HeaderSkeletonSnapshot, HeaderSkeletonStatus } from './HeaderSkeleton'
import ChartPie from './chart/ChartPie'

function Header() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	////// API 검색 일괄 데이터 //////
	const searchState = useAPISearchState();
	const searchDispatch = useAPISearchDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state
	const { searchLoading, search, searchError } = searchState

    return (
        <header>
            <div className={ styles.header_frame }>
                <div className={ styles.header_detail__top }>
                    <h1 className={ styles.header_item__top_text }>CALCS</h1>
                </div>

                <div className={ styles.header_detail__mid }>
                    <Link className={ styles.header_item__mid } to='/'>
                        <img className={ styles.header_item__mid_img } src='../../icon/dashboard.png' />
                        <span className={ styles.header_item__mid_text }>Dashboard</span>
                    </Link>

                    <Link className={ styles.header_item__mid } to='/service'>
                        <img className={ styles.header_item__mid_img } src='../../icon/dashboard.png' />
                        <span className={ styles.header_item__mid_text }>Service</span>
                    </Link>

                    <Link className={ styles.header_item__mid } to='/'>
                        <img className={ styles.header_item__mid_img } src='../../icon/dashboard.png' />
                        <span className={ styles.header_item__mid_text }>Schedule</span>
                    </Link>

                    <Link className={ styles.header_item__mid } to='/'>
                        <img className={ styles.header_item__mid_img } src='../../icon/dashboard.png' />
                        <span className={ styles.header_item__mid_text }>Blog</span>
                    </Link>
                </div>


                <div className={ styles.header_detail__btm }>
                    <div className={ styles.header_item__btm }>
                        <span className={ styles.header_item__btm_text }>Snapshot</span>
                        { ( loading )
                        ? <HeaderSkeletonSnapshot />
                        : <span className={ styles.header_item__btm_value }>{ snapshot?.result.length } Count</span>
                        }

                        <span className={ styles.header_item__btm_text }>Last Snapshot</span>
                        { ( loading )
                        ? <HeaderSkeletonSnapshot />
                        : <span className={ styles.header_item__btm_value }>{ snapshot?.result.length } Count</span>
                        }
                    </div>
                </div>

                <div className={ styles.header_detail__chr }>
                    <div className={ styles.header_item_chr }>
                        { ( !status || !service )
                        ? <HeaderSkeletonStatus />
                        : <>
                            <div className={ styles.header_item_chr_grph }>
                                <ChartPie percent={ status?.result.length * 100 / service?.result.length } />
                            </div>
                            <div className={ styles.header_item_chr_text }>
                                <p>Online</p>
                            </div>
                        </>
                        }
                    </div>

                    <div className={ styles.header_item_chr }>
                        { ( !status || !service )
                        ? <HeaderSkeletonStatus />
                        : <>
                            <div className={ styles.header_item_chr_grph }>
                                <ChartPie percent={ status?.result.length * 100 / service?.result.length } />
                            </div>
                            <div className={ styles.header_item_chr_text }>
                                <p>Expected</p>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
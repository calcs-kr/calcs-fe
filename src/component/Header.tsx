// React
import { useState } from 'react'

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

    const [menuStatus, setMenuStatus] = useState([])
    async function changeMenuStatus(index: number) {
        let items:any = [...menuStatus]
        let item:any  = items[index]
        item = !item
        items[index] = item
        setMenuStatus(items)
    }

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
                                <ChartPie percent={ Math.round(status?.result.length * 100 / service?.result.length) } />
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
                                <ChartPie percent={ Math.round(status?.result.length * 100 / service?.result.length) } />
                            </div>
                            <div className={ styles.header_item_chr_text }>
                                <p>Expected</p>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>

            <div className={ styles.category_frame }>
                <div className={ styles.category_detail }>
                    { category?.result.map(( categoryItem: any, index ) => (
                        <div className={ !menuStatus[index] ? styles.category_item__title : styles.category_item__title_act } key={ categoryItem._id }>
                            <span className={ styles.category_item__title_text }>{ categoryItem.name }</span>
                            <img className={ styles.category_item__title_img } src='/icon/arrow_right.png' alt='' onClick={ () => changeMenuStatus(index) } />

                            <div className={ styles.category_item__frame }>
                                { service?.result.map(( serviceItem: any, index ) => {
                                    if(serviceItem.category._id === categoryItem._id) {
                                        return ( <div className={ styles.category_item__subtitle } key={ serviceItem._id }>
                                            <span className={ styles.category_item__subtitle_divider }></span>
                                            <div className={ styles.category_item__subtitle_divi }></div>
                                            <span>{ serviceItem.category._id === categoryItem._id ? serviceItem.name : '' }</span>
                                        </div> )
                                    }
                                } ) }
                            </div>
                        </div>
                    ) ) }
                </div>
            </div>
        </header>
    )
}

export default Header
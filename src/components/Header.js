// React
import { React, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ChartPie from '../charts/ChartPie';

// Context
import { APIContext } from '../content/APIProvider'

// Style
import styles from './Header.module.css';

function Header() {
    const [menuStatus, setMenuStatus] = useState(null)
    async function changeMenuStatus(index) {
        let items = [...menuStatus]
        let item  = items[index]
        item = !item
        items[index] = item
        setMenuStatus(items)
    }
    const [service, category, snapshot, status] = useContext(APIContext)

    useEffect(() => {
        setMenuStatus( new Array(service.length).fill(false) )
    }, [])


    function activeCheck(path) {
        if( window.location.pathname === path ) { return styles.header_item__mid_active }
        return styles.header_item__mid
    }
    function activeImage(path) {
        if( window.location.pathname === path ) { return '/images/' + path + '_active.png' }
        return '/images/' + path + '.png'
    }

    if( !menuStatus ) return <div></div>

    return (
        <header>
            <div className={ styles.header_frame }>
                <div className={ styles.header_detail__top }>
                    <h1 className={ styles.header_item__top_text }>CALCS</h1>
                </div>


                <div className={ styles.header_detail__mid }>
                    <Link to='/' className={ activeCheck('/') }>
                        <img className={ styles.header_item__mid_img } src={ activeImage('/schedule') } alt='' />
                        <span className={ styles.header_item__mid_text }>Dashboard</span>
                    </Link>

                    <Link to='/service' className={ activeCheck('/service') }>
                        <img className={ styles.header_item__mid_img } src={ activeImage('/service') } alt='' />
                        <span className={ styles.header_item__mid_text }>Service</span>
                    </Link>

                    <Link to='/schedule' className={ activeCheck('/schedule') }>
                        <img className={ styles.header_item__mid_img } src={ activeImage('/schedule') } alt='' />
                        <span className={ styles.header_item__mid_text }>Schedule</span>
                    </Link>

                    <div className={ styles.header_item__mid }>
                        <img className={ styles.header_item__mid_img } src='/images/dashboard.png' alt='' />
                        <a href='https://reasley.com' target='_blank' rel='noreferrer' className={ styles.header_item__mid_text }>Blog</a>
                    </div>
                </div>


                <div className={ styles.header_detail__btm }>
                    <div className={ styles.header_item__btm }>
                        <span className={ styles.header_item__btm_text }>Snapshot</span>
                        <span className={ styles.header_item__btm_value }>{ snapshot.length } Count</span>

                        <span className={ styles.header_item__btm_text }>Last Snapshot</span>
                        <span className={ styles.header_item__btm_value }>{ snapshot[0].createAt.split('T')[0] }</span>
                    </div>
                </div>

                <div className={ styles.header_detail__chr }>
                    <div className={ styles.header_item_chr }>
                        <div className={ styles.header_item_chr_grph }>
                            <ChartPie percent={ parseInt(status.length * 100 / 11)  } />
                        </div>
                        <div className={ styles.header_item_chr_text }>
                            <p>Online</p>
                        </div>
                    </div>

                    <div className={ styles.header_item_chr }>
                        <div className={ styles.header_item_chr_grph }>
                            <ChartPie percent={ parseInt(status.length * 100 / 11)  } />
                        </div>
                        <div className={ styles.header_item_chr_text }>
                            <p>Expected</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ styles.category_frame }>
                <div className={ styles.category_detail }>
                    { category.map(( categoryItem, index ) => (
                        <div className={ !menuStatus[index] ? styles.category_item__title : styles.category_item__title_act } key={ categoryItem._id }>
                            <span className={ styles.category_item__title_text }>{ categoryItem.name }</span>
                            <img className={ styles.category_item__title_img } src='/images/arrow_right.png' alt='' onClick={ () => changeMenuStatus(index) } />

                            <div className={ styles.category_item__frame }>
                                { service.map(( serviceItem, index ) => {
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

import axios from 'axios'
import config from '../config'

// React
import { React, useContext, useEffect, useState } from 'react'

// Context
import { APIContext } from '../content/APIProvider'

// Style
import styles from './Tool.module.css';

function Tool() {
    const [service, category, snapshot, status] = useContext(APIContext)

    // modal
    const [modalStatus, setModalStatus] = useState(new Array(service.length).fill(false))

    
    const [keyword, setKeyword] = useState('')
    const [search, setSearch]   = useState(service)
    const [error, setError]   = useState([])
    const [loading, setLoading]   = useState([])

    // Input Change Detect
    const onChange = (element) => {
        const { value, name } = element.target
        setKeyword(value)
    }

    const onSearch = async (element) => {
        if( element.type === 'keypress' ) {
            if(element.charCode !== 13) return null
        }
        try {
            // reset data
            setError(null) 
            
            // loading to true
            setLoading(true) 

            // set data
            let response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service?keyword=${keyword}&type=name`)
            setSearch(response.data.result)
        } catch (e) {
            setError(e) 
        }
        setLoading(false)
    }

    async function modalStatusChange(index) {
        let items = [...modalStatus]
        let item  = items[index]
        item = !item
        items[index] = item
        await setModalStatus(new Array(modalStatus).fill(false))
        await setModalStatus(items)
    }

    return (
        <div className={ styles.tool_frame }>
            {/* 검색 구역 */}
            <div className={ styles.tool_detail }>
                <div className={ styles.tool_item__search }>
                    <span className={ styles.tool_item__search_text }>{ search.length } Items</span>
                    <div className={ styles.tool_item__search_icon }>
                        <div className={ styles.tool_item__search_icon_frame }>
                            <input className={ styles.tool_item__search_icon_frame__input } onChange={onChange} onKeyPress={onSearch} value={keyword} placeholder='search' />
                            <img className={ styles.tool_item__search_icon_frame__img } src='/images/search.png' alt='' onClick={onSearch} />
                        </div>
                        <img className={ styles.tool_item__search_icon_frame__img } src='/images/sort.png' alt='' />
                    </div>
                </div>
            </div>

            {/* 아이템 구역 */}
            <div className={[ styles.tool_detail, styles.tool_detail__tool ].join(' ') }>
                { search.map((item, index) => {
                    return (
                        <div className={ styles.tool_item__tool } key={ index } onClick={ () => { modalStatusChange(index) } }>
                            <div className={ !modalStatus[index] ? styles.tool_item__modal : styles.tool_item__modal_act }>
                                <div className={ styles.tool_item__modal_context } onClick={(e) => e.stopPropagation()}>
                                    <img className={ styles.tool_item__modal_img } src='/images/web.png' alt='' />
                                    <div className={ styles.tool_item__modal_text }>

                                        <p className={ styles.tool_item__modal_category }>{ item.category.name }</p>
                                        <p className={ styles.tool_item__modal_name }>{ item.name }</p>
                                        <p className={ styles.tool_item__modal_describe }>{ item.describe }</p>

                                        <p className={ styles.tool_item__modal_team }>Team</p>
                                        <span className={ styles.tool_item__modal_user }>{ item.team }</span>

                                        <p className={ styles.tool_item__modal_period }>Development Period</p>
                                        <span>{`${ item.startAt.split('T')[0].replace('-', '.') } - ${ item.endAt.split('T')[0].replace('-', '.') }`}</span>

                                        <div className={ styles.tool_item__modal_stack }>
                                            { Object.keys(item.stack).map((stack, index) => {
                                                if( ['design', 'frontend', 'backend', 'devops'].indexOf(stack) === -1 ) return null
                                                return (
                                                    <div className={ styles.tool_item__modal_stack_context } key={ index }>
                                                        <span className={ styles.tool_item__modal_stack__title }>{ 
                                                            stack === 'design' ? 'Design'
                                                            : stack === 'frontend' ? 'FrontEnd'
                                                            : stack === 'backend' ? 'BackEnd'
                                                            : stack === 'devops' ? 'DevOps'
                                                            : null
                                                        } </span>
                                                        
                                                        <div className={ styles.tool_item__modal_stack__list }>
                                                            { item.stack[stack].map((type, index) => {
                                                                return (
                                                                    <span className={ styles.tool_item__modal_stack__text } key={index}>{ type.name }</span>
                                                                )
                                                            }) }
                                                        </div>
                                                    </div>
                                                )
                                            }) }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                            <img className={ styles.tool_item__tool_img } src='/images/web.png' alt='' />

                            <div className={ styles.toot_item__tool_data } onClick={ () => { modalStatusChange(index) } }>
                                <div className={ styles.toot_item__tool_data_top }>
                                    <span className={ styles.tool_item__tool_category }>{ item.category.name }</span>
                                    <span className={ styles.tool_item__tool_name }>{ item.name }</span>
                                    <span className={ styles.tool_item__tool_describe }>{ item.describe }</span>
                                </div>

                                <div className={ styles.toot_item__tool_data_btm }>
                                    <span>4 hours ago</span>
                                    <span>45</span>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
export default Tool

// 설정 파일
import axios from 'axios';
import config from '../config'

// React
import { useEffect, useState } from 'react';

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext';
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext';

// Style
import styles from './Tool.module.css';
import { ToolSkeletonSearch, ToolSkeletonService } from './ToolSkeleton';

function Tool() {
	////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	////// API 검색 일괄 데이터 //////
	const searchState = useAPISearchState();
	const searchDispatch = useAPISearchDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state
	const { searchLoading, search, searchError } = searchState
	const [serviceList, setServiceList] = useState([])  // 서비스 리스트
    const [keyword, setKeyword] = useState('')          // 검색 키워드


    // 이미지 로딩 대기
    const [loaded, setLoaded] = useState(0);
    function onLoad() {
        setLoaded(prevState => prevState + 1);
    }

	// 데이터 검색 함수
    const onSearch = async (element: any) => {
        if( element.type === 'keypress' && element?.charCode !== 13 ) return null

		try {
			searchDispatch({ type: 'LOADING' })
            setLoaded(0)
			const search  = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service?keyword=${keyword}&type=name`)

            setTimeout( async function() {
                try {
                    searchDispatch({ type: 'SEARCH', search: search.data })
                    setServiceList(search.data.result)
                } catch (err) {
                    console.log(err)
                }
            }, 0.5 * 1000);
		} catch (e) {
			searchDispatch({ type: 'ERROR', searchError: e })
		}
    }

	// 데이터 검색 감지 함수
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setKeyword(value)
    }


	////// 모달창 //////
    const [modalStatus, setModalStatus] = useState(Array(serviceList?.length).fill(false))
	async function modalStatusChange(index: number) {
        let items = [...modalStatus]
        let item  = items[index]
        item = !item
        items[index] = item
        await setModalStatus(items)
    }

    useEffect(() => {
        if(!service) return
        setServiceList(service.result)
    }, [service])
	
	useEffect(() => {
		if(keyword === '' ) { setServiceList(service ? service?.result : []) }  // 검색 키워드가 없을 경우 
		else { setServiceList(search ? search?.result : []) }                   // 검색 키워드가 있을 경우
	}, [search])                                                               // onSearch 함수 실행마다 동작


	////// 데이터 반환 //////
	if( error ) return (
        <div className={ styles.tool_frame }>
            <span>서비스에 에러가 발생하였습니다.</span> 
        </div>
    )

	return (
		<div className={ styles.tool_frame }>
            {/* 검색 구역 */}
            <div className={ styles.tool_detail }>
                <div className={ styles.tool_item__search }>
                    {( ( loading || searchLoading ) || (!serviceList) )
                    ? <ToolSkeletonSearch />
                    : <span className={ styles.tool_item__search_text }>{ serviceList?.length } Items</span>
                    }
                    <div className={ styles.tool_item__search_icon }>
                        <div className={ styles.tool_item__search_icon_frame }>
                            <input className={ styles.tool_item__search_icon_frame__input } onChange={onChange} onKeyPress={onSearch} value={keyword} placeholder='search' />
                            <img className={ styles.tool_item__search_icon_frame__img } src='/images/search.png' alt='' />
                        </div>
                        <img className={ styles.tool_item__search_icon_frame__img } src='/images/sort.png' alt='' />
                    </div>
                </div>
            </div>

            {/* 아이템 구역 */}
            { (( loading || searchLoading ) || (!serviceList) )
            ? <ToolSkeletonService />
            : <div className={[ styles.tool_detail, styles.tool_detail__tool ].join(' ') }>
                { serviceList.map((item: any, index: number) => {
                    return (
                        <div className={ styles.tool_item__tool } key={ index } style={{ display: loaded === serviceList.length ? 'block': 'none' }} onClick={ () => { modalStatusChange(index) } }>
                            <div className={ !modalStatus[index] ? styles.tool_item__modal : styles.tool_item__modal_act }>
                                <div className={ styles.tool_item__modal_context } onClick={(e) => e.stopPropagation()}>
                                    <img className={ styles.tool_item__modal_img } src='/img/service.png' alt='' />

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
                                                            { item.stack[stack].map((type: any, index: number) => {
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

                        
                            
                            <img className={ styles.tool_item__tool_img } src='/img/service.png' onLoad={onLoad} alt='' />

                            <div className={ styles.toot_item__tool_data } onClick={ () => { modalStatusChange(index) } }>
                                <div className={ styles.toot_item__tool_data_top }>
                                    <span className={ styles.tool_item__tool_category }>{ item.category.name }</span>
                                    <span className={ styles.tool_item__tool_name }>{ item.name }</span>
                                    <span className={ styles.tool_item__tool_describe }>{ item.describe }</span>
                                </div>

                                <div className={ styles.toot_item__tool_data_btm }>
                                    <span>4 hours ago</span>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
            }
            
        </div>
	)
}

export default Tool;
// 설정 파일
import axios from 'axios'
import config from '../config'

// React
import { useEffect, useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// React
import { } from 'react-router-dom'

// Style
import styles from './StoneSearch.module.css';
import { convertArrayToQueryString, convertStringToQueryString } from '../function/convertQueryString'

function StoneSearch() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, tag, error } = state

    // 필터 데이터 정의
    interface Filter {
        keyword: string;
        category: string;
        tag: Array<string|null>;
        stack: Array<string|null>;
    }
    const [filter, setFilter] = useState<Filter>({ keyword: '', category: '', tag: [], stack: [] })


    // 스톤 리스트
    const [serviceList, setServiceList] = useState([])
    useEffect(() => {
        let temp: [] = []
        service?.map((serviceItem) => temp.push(serviceItem) )
        setServiceList(temp)
    }, [service])

    // 페이지네이션 페이지
    const [nowPage, setNowPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    useEffect(() => {
        setMaxPage(Math.ceil(serviceList.length / 12) !== 0 ? Math.ceil(serviceList.length / 12) : 1 )
    }, [serviceList])

    useEffect(() => {
        chnagePage(nowPage)
    }, [maxPage])

    function chnagePage(page: number) {
        setNowPage(page > maxPage ? maxPage : page)
    }

    // 드롭다운 기능이 동작할 항목 선택
    type dropdownType = {
        [index: string]: boolean  // Index Signature 추가
        category: boolean
        tag: boolean
        design: boolean
        frontend: boolean
        backend: boolean
        devops: boolean
    }
    const [dropdownStatus, setDropdownStatus] = useState<dropdownType>({ 'category': true, 'tag': true, 'design': false, 'frontend': false, 'backend': false, 'devops': false })

    // 아코디언 메뉴 클릭 시 동작
    function dropdownAction(ItemToBeAccordion: string) {
        // 선택한 항목의 아코디언 상태 변경
        setDropdownStatus(prev => ({ ...prev, [ItemToBeAccordion]: !dropdownStatus[ItemToBeAccordion] }) )
    }

    // 이름과 팀원 검색
    function filterKeywordHandler(e: any) {
        setFilter(prev => ({ ...prev, keyword: e.target.value }))
    }

    // 카테고리 필터링
    function filterCategoryHandler(e: any) {
        e.target.id === 'all'
        ? setFilter(prev => ({ ...prev, category: '' }))
        : setFilter(prev => ({ ...prev, category: e.target.id }))
    }

    // 스택 필터링
    function filterStackHandler(e: any) {
        let tmp = filter['stack']
        
        e.target.checked
        ? tmp.push(e.target.id)
        : tmp = tmp.filter((element) => element !== e.target.id)

        setFilter(prev => ({ ...prev, stack: tmp }))
    }

    // 태그 필터링
    function filterTagHandler(e: any) {
        let tmp = filter['tag']
        
        e.target.checked
        ? tmp.push(e.target.id)
        : tmp = tmp.filter((element) => element !== e.target.id)

        setFilter(prev => ({ ...prev, tag: tmp }))
    }

    // 연관 검색어
    function relatedSearch (relatedSearchKeyword: string) {
        setFilter(prev => ({ ...prev, keyword: relatedSearchKeyword }))
    }

    // 필터링 변경 시 데이터 조회
    useEffect(() => {
        getBatchData()
    }, [filter])

    // 데이터 조회 함수
    const getBatchData = async () => {
        const service = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service?${convertStringToQueryString('keyword', filter['keyword'])}${convertStringToQueryString('category', filter['category'])}${convertArrayToQueryString('stack', filter['stack'])}${convertArrayToQueryString('tag', filter['tag'])}`)
        
        setServiceList(service.data.result)
    }

    return (
        <div className={ styles.stonekey }>
            <div className={[ styles.stonekey_item, styles.stonekey_item_title ].join(' ')}>
                <span className={ styles.stonekey_item_head__title }>STONE</span>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_head ].join(' ')}>
                <span className={ styles.stonekey_item__head_count }>{ serviceList.length }개의 스톤이 존재합니다.</span>

                <div className={ styles.stonekey_item__head_search }>
                    <input type='text' placeholder='search' value={filter.keyword} onChange={filterKeywordHandler} />
                    <img src='/icon/search.png' alt='' />
                </div>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_side ].join(' ')}>
                <div className={[ styles.stonekey_item_side__category,
                    dropdownStatus.category
                    ? styles.dropdown_active
                    : styles.dropdown_disable ]
                    .join(' ')}>
                    <div className={ styles.stonekey_item_side__category_classify } onClick={ () => dropdownAction('category') }>
                        <span>카테고리</span>
                        <div className={ styles.stonekey_item_side__category_icon } />
                    </div>
                    
                    <div className={ styles.stonekey_item_side__category_body }>
                        <div className={ styles.stonekey_item_side__category__body }>
                            <span className={[ styles.stonekey_item_side__category__body_name, filter['category'] === '' ? styles.category_active : styles.category_disable ].join(' ')} id='all' onClick={(e) => filterCategoryHandler(e)}>All</span>
                        </div>
                        { category?.map((item :any) => (
                            <div className={ styles.stonekey_item_side__category__body } key={ item['_id'] }>
                                <span className={[ styles.stonekey_item_side__category__body_name, item['_id'] === filter['category'] ? styles.category_active : styles.category_disable ].join(' ')} id={ item['_id'] } onClick={(e) => filterCategoryHandler(e)}>{ item['name'] }</span>
                                <span>1</span>
                            </div>
                        )) }
                    </div>
                </div>

                <div className={[ styles.stonekey_item_side__category, 
                    dropdownStatus.tag 
                    ? styles.dropdown_active 
                    : styles.dropdown_disable ]
                    .join(' ')}>
                    <div className={ styles.stonekey_item_side__filter_classify } onClick={ () => dropdownAction('tag') }>
                        <span>태그</span>
                        <div className={ styles.stonekey_item_side__category_icon } />
                    </div>

                    <div className={ styles.stonekey_item_side__filter_body }>
                        { tag?.map((item: any) => (
                            <div className={ styles.stonekey_item_side__filter__body } key={ item['_id'] }>
                                <input id={ item['_id'] } type='checkbox' onChange={(e) => filterTagHandler(e)} />
                                <label htmlFor={ item['_id'] }></label>
                                <label htmlFor={ item['_id'] }>{ item['name'] }</label>
                            </div>
                        )) }
                    </div>
                </div>

                <div className={[ styles.stonekey_item_side__category, 
                    dropdownStatus.design 
                    ? styles.dropdown_active 
                    : styles.dropdown_disable ]
                    .join(' ')}>
                    <div className={ styles.stonekey_item_side__filter_classify } onClick={ () => dropdownAction('design') }>
                        <span>디자인</span>
                        <div className={ styles.stonekey_item_side__category_icon } />
                    </div>

                    <div className={ styles.stonekey_item_side__filter_body }>
                        { stack?.map((item: any) => { 
                            if( item['type'] !== 'design' ) return null
                            return (
                                <div className={ styles.stonekey_item_side__filter__body } key={ item['_id'] }>
                                    <input id={ item['_id'] } type='checkbox' onChange={(e) => filterStackHandler(e)} />
                                    <label htmlFor={ item['_id'] }></label>
                                    <label htmlFor={ item['_id'] }>{ item['name'] }</label>
                                </div>
                        )} ) }
                    </div>
                </div>

                <div className={[ styles.stonekey_item_side__category, 
                    dropdownStatus.frontend 
                    ? styles.dropdown_active 
                    : styles.dropdown_disable ]
                    .join(' ')}>
                    <div className={ styles.stonekey_item_side__filter_classify } onClick={ () => dropdownAction('frontend') }>
                        <span>프론트엔드</span>
                        <div className={ styles.stonekey_item_side__category_icon } />
                    </div>

                    <div className={ styles.stonekey_item_side__filter_body }>
                        { stack?.map((item: any) => { 
                            if( item['type'] !== 'frontend' ) return null
                            return (
                                <div className={ styles.stonekey_item_side__filter__body } key={ item['_id'] }>
                                    <input id={ item['_id'] } type='checkbox' onChange={(e) => filterStackHandler(e)} />
                                    <label htmlFor={ item['_id'] }></label>
                                    <label htmlFor={ item['_id'] }>{ item['name'] }</label>
                                </div>
                        )} ) }
                    </div>
                </div>

                <div className={[ styles.stonekey_item_side__category,
                    dropdownStatus.backend 
                    ? styles.dropdown_active 
                    : styles.dropdown_disable ]
                    .join(' ')}>
                    <div className={ styles.stonekey_item_side__filter_classify } onClick={ () => dropdownAction('backend') }>
                        <span>백엔드</span>
                        <div className={ styles.stonekey_item_side__category_icon } />
                    </div>

                    <div className={ styles.stonekey_item_side__filter_body }>
                        { stack?.map((item: any) => { 
                            if( item['type'] !== 'backend' ) return null
                            return (
                                <div className={ styles.stonekey_item_side__filter__body } key={ item['_id'] }>
                                    <input id={ item['_id'] } type='checkbox' onChange={(e) => filterStackHandler(e)} />
                                    <label htmlFor={ item['_id'] }></label>
                                    <label htmlFor={ item['_id'] }>{ item['name'] }</label>
                                </div>
                        )} ) }
                    </div>
                </div>

                <div className={[ styles.stonekey_item_side__category,
                    dropdownStatus.devops 
                    ? styles.dropdown_active 
                    : styles.dropdown_disable ]
                    .join(' ')}>
                    <div className={ styles.stonekey_item_side__filter_classify } onClick={ () => dropdownAction('devops') }>
                        <span>데브옵스</span>
                        <div className={ styles.stonekey_item_side__category_icon } />
                    </div>

                    <div className={ styles.stonekey_item_side__filter_body }>
                        { stack?.map((item: any) => { 
                            if( item['type'] !== 'devops' ) return null
                            return (
                                <div className={ styles.stonekey_item_side__filter__body } key={ item['_id'] }>
                                    <input id={ item['_id'] } type='checkbox' onChange={(e) => filterStackHandler(e)} />
                                    <label htmlFor={ item['_id'] }></label>
                                    <label htmlFor={ item['_id'] }>{ item['name'] }</label>
                                </div>
                        )} ) }
                    </div>
                </div>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_body ].join(' ')}>
                <div className={ styles.stonekey_item__target }>
                    <span>연관검색어</span>
                    <span className={ filter['keyword'] === '' ? styles.category_active : styles.category_disable } onClick={ () => relatedSearch('') }>전체</span>
                    <span className={ filter['keyword'] === 'discord' ? styles.category_active : styles.category_disable } onClick={ () => relatedSearch('discord') }>디스코드</span>
                    <span className={ filter['keyword'] === 'Isedol' ? styles.category_active : styles.category_disable } onClick={ () => relatedSearch('Isedol') }>이세돌</span>
                    <span className={ filter['keyword'] === 'minecraft' ? styles.category_active : styles.category_disable } onClick={ () => relatedSearch('minecraft') }>마인크래프트</span>
                    <span className={ filter['keyword'] === 'library' ? styles.category_active : styles.category_disable } onClick={ () => relatedSearch('library') }>라이브러리</span>
                    <span className={ filter['keyword'] === 'calc' ? styles.category_active : styles.category_disable } onClick={ () => relatedSearch('calc') }>계산기</span>
                </div>

                <div className={ styles.stonekey_item__body }>
                    { serviceList.length > 0 
                    ? serviceList?.map((item: {'stack': [], '_id': string, 'category': {'name': string}, 'name': string, describe: string}, index) => {
                        if(index >= nowPage*12-12 && index <= nowPage*12-1) return (
                        <div className={ styles.stonekey_item__stone } key={ item['_id'] }>
                            <div className={ styles.stonekey_item__stone_item }>
                                <img src='/img/stone.png' alt='' />

                                <span className={ styles.stonekey_item__stone_category }>{ item['category']['name'] }</span>
                                <span className={ styles.stonekey_item__stone_title }>{ item['name'] }</span>
                                <span className={ styles.stonekey_item__stone_describe }>{ item['describe'] }</span>

                                <div className={ styles.stonekey_item__stone_stack }>
                                    { item['stack'].map((itemStack) => {
                                        if( itemStack['type'] !== 'frontend' && itemStack['type'] !== 'backend' ) return
                                        return (
                                            <span className={ styles.stonekey_item__stone__stack } key={ itemStack['_id'] }>{ itemStack['name'] }</span>
                                        )
                                    }) }
                                </div>
                            </div>
                        </div>
                    )} ) 
                    : <div className={ styles.stonekey_item__none }>
                        <span>검색된 항목이 없습니다.</span>
                    </div>
                    }
                </div>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_pagenation ].join(' ')}>
                { nowPage >= 4
                ? <>
                    <div className={ styles.stonekey_item__img }>
                        <div className={[ styles.icon_left ].join(' ')}></div>
                    </div>
                    <span onClick={() => chnagePage(1)}>1</span>
                    <span>...</span>
                </>
                : null }
                
                { nowPage-3 > 0 ? <span onClick={() => chnagePage(nowPage-3)}>{nowPage-3}</span> : null }
                { nowPage-2 > 0 ? <span onClick={() => chnagePage(nowPage-2)}>{nowPage-2}</span> : null }
                { nowPage-1 > 0 ? <span onClick={() => chnagePage(nowPage-1)}>{nowPage-1}</span> : null }
                
                <span className={[ styles.stonekey_item__pagenation_now, styles.category_active ].join(' ')}>{ nowPage }</span>

                { nowPage+1 <= maxPage ? <span onClick={() => chnagePage(nowPage+1)}>{nowPage+1}</span> : null }
                { nowPage+2 <= maxPage ? <span onClick={() => chnagePage(nowPage+2)}>{nowPage+2}</span> : null }
                { nowPage+3 <= maxPage ? <span onClick={() => chnagePage(nowPage+3)}>{nowPage+3}</span> : null }

                { nowPage <= maxPage - 2
                ? <>
                    <span>...</span>
                    <span onClick={() => chnagePage(maxPage)}>{ maxPage }</span>
                    <div className={ styles.stonekey_item__img }>
                        <div className={[ styles.icon_right ].join(' ')}></div>
                    </div>
                </>
                : null }
            </div>
        </div>
    )
}

export default StoneSearch
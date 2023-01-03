// React
import { useEffect, useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// React
import { Link } from 'react-router-dom'

// Style
import styles from './StoneSearch.module.css';

function StoneSearch() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    const a = [1,2,3,4,5,6,7,8,9,10,11,12]

    // 필터 항목들
    let frontend: [] = []
    let backend: []  = []
    let devops: []   = []

    const tag = ['Stone', 'Sketch', 'Mountain']

    // 필터 선택 추가
    stack?.result.map((stackItem) => {
        if(stackItem['type'] === 'frontend') frontend.push(stackItem['name'])
        if(stackItem['type'] === 'backend')  backend.push(stackItem['name'])
        if(stackItem['type'] === 'devops')   devops.push(stackItem['name'])
    })
    

    // 드롭다운 기능이 동작할 항목 선택
    type dropdownType = {
        [index: string]: boolean  // Index Signature 추가
        category: boolean
        tag: boolean
        frontend: boolean
        backend: boolean
        devops: boolean
    }
    const [dropdownStatus, setDropdownStatus] = useState<dropdownType>({ 'category': true, 'tag': true, 'frontend': false, 'backend': false, 'devops': true })

    // 아코디언 메뉴 클릭 시 동작
    function dropdownAction(ItemToBeAccordion: string) {
        // 선택한 항목의 아코디언 상태 변경
        setDropdownStatus(prev => ({ ...prev, [ItemToBeAccordion]: !dropdownStatus[ItemToBeAccordion] }) )
    }

    return (
        <div className={ styles.stonekey }>
            <div className={[ styles.stonekey_item, styles.stonekey_item_title ].join(' ')}>
                <span className={ styles.stonekey_item_head__title }>STONE</span>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_head ].join(' ')}>
                <span className={ styles.stonekey_item__head_count }>8개의 스톤이 존재합니다.</span>

                <form className={ styles.stonekey_item__head_search }>
                    <input placeholder='search' />
                    <img src='/icon/search.png' alt='' />
                </form>
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
                        { category?.result.map((item) => (
                            <Link to={ `?category=${ item['name'] }` } className={ styles.stonekey_item_side__category__body } key={ item }>
                                <span className={ styles.stonekey_item_side__category__body_name }>{ item['name'] }</span>
                                <span>1</span>
                            </Link>
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
                        { tag.map((item) => (
                            <div className={ styles.stonekey_item_side__filter__body } key={ item }>
                                <input id={ item } type='checkbox' />
                                <label htmlFor={ item }></label>
                                <label htmlFor={ item }>{ item }</label>
                            </div>
                        )) }
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
                        { frontend.map((item) => (
                            <div className={ styles.stonekey_item_side__filter__body } key={ item }>
                                <input id={ item } type='checkbox' />
                                <label htmlFor={ item }></label>
                                <label htmlFor={ item }>{ item }</label>
                            </div>
                        )) }
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
                        { backend.map((item) => (
                            <div className={ styles.stonekey_item_side__filter__body } key={ item }>
                                <input id={ item } type='checkbox' />
                                <label htmlFor={ item }></label>
                                <label htmlFor={ item }>{ item }</label>
                            </div>
                        )) }
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
                        { devops.map((item) => (
                            <div className={ styles.stonekey_item_side__filter__body } key={ item }>
                                <input id={ item } type='checkbox' />
                                <label htmlFor={ item }></label>
                                <label htmlFor={ item }>{ item }</label>
                            </div>
                        )) }
                    </div>
                </div>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_body ].join(' ')}>
                <div className={ styles.stonekey_item__target }>
                    <span>연관검색어</span>
                    <span>디스코드</span>
                    <span>이세돌</span>
                    <span>마인크래프트</span>
                    <span>라이브러리</span>
                    <span>계산기</span>
                </div>

                <div className={ styles.stonekey_item__body }>
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
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_pagenation ].join(' ')}>
                <div className={ styles.stonekey_item__img }>
                    <div className={[ styles.icon_left ].join(' ')}></div>
                </div>
                { a.map((item, index) => {
                    if( index > 6 ) return
                    return (
                        <span key={item}>{item}</span>
                )} ) }
                <span>...</span>
                <span>8</span>
                <div className={ styles.stonekey_item__img }>
                    <div className={[ styles.icon_right ].join(' ')}></div>
                </div>
            </div>
        </div>
    )
}

export default StoneSearch
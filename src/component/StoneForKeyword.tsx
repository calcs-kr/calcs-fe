// React
import { useEffect, useState } from 'react'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Style
import styles from './StoneForKeyword.module.css';

function StoneForKeyWord() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    const [tagItems, setTagItems] = useState(service)

    useEffect(() => {
        setTagItems(service)
    }, [service])

    enum Tag { 'all', 'Stone', 'Mountain', 'Sketch' }
    const [tag, setTag] = useState('all')
    function selectTag(str: string) { setTag(str) }
    useEffect(() => {
        if( tag === 'all' ) {             // 전체
            setTagItems(service)
            return
        }

        const temp: [] = []
        service?.map((item) => {   // 특정 태그
            if(item['tag']['name'] !== tag) return
            temp.push(item)
        })
        setTagItems(temp)
    }, [tag])


    return (
        <div className={ styles.stonekey_frame }>
            <div className={[ styles.stonekey_item, styles.stonekey_item_title ].join(' ')}>
                <span className={ styles.stonekey_item__title }>태그별 추천 항목</span>
                <span className={ styles.stonekey_item__subhead }>각 태그에서 인기가 많거나 추천된 항목입니다.</span>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_tag ].join(' ')}>
                <div>
                    <span className={[ styles.stonekey_item__tag, tag === 'all' ? styles.active : '' ].join(' ')} onClick={() => selectTag('all')}>전체</span>
                    <span className={[ styles.stonekey_item__tag, tag === 'Stone' ? styles.active : '' ].join(' ')} onClick={() => selectTag('Stone')}>스톤</span>
                    <span className={[ styles.stonekey_item__tag, tag === 'Mountain' ? styles.active : '' ].join(' ')} onClick={() => selectTag('Mountain')}>마운틴</span>
                    <span className={[ styles.stonekey_item__tag, tag === 'Sketch' ? styles.active : '' ].join(' ')} onClick={() => selectTag('Sketch')}>스케치</span>
                </div>
            </div>

            <div className={[ styles.stonekey_item, styles.stonekey_item_stone ].join(' ')}>
                { tagItems?.map((item: any, num: number) => {
                    if (num >= 4) return
                    if( !service?.length ) { return ( <span>없습니다.</span> ) }
                    return ( <div className={ styles.stonekey_item__stone } key={ item._id }>
                        <div>
                            <img src='/img/stone.png' alt='' />

                            <span className={ styles.stonelist_item__stone_category }>{ item.category.name }</span>
                            <span className={ styles.stonelist_item__stone_title }>{ item.name }</span>
                            <span className={ styles.stonelist_item__stone_describe }>{ item.describe }</span>
                        </div>
                        
                        <div>
                            <span className={ styles.stonelist_item__stone_uptime }>{ item.createAt.split('T')[0] }</span>
                        </div>
                    </div> )
                }) }
            </div>
        </div>
    )
}

export default StoneForKeyWord
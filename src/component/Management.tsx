// React
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Style
import styles from './Management.module.css'

import { useCookies } from 'react-cookie'

// 설정 파일
import axios from 'axios'
import config from '../config'


function Manaegment() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    const [showModal, setShowModal] = useState(false)

    const [cookies, setCookie] = useCookies(['token'])

    const [fileLoading, setFileLoading] = useState(false)
    const [file, setFile] = useState<any>(null)

    useEffect(() => {
        fileGet()
    }, [])

    async function fileGet() {
        setFileLoading(true)
        const file = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/file`, { headers: {Authorization: `Bearer ${cookies.token}`}})
        setFile(file.data)
        setFileLoading(false)
    }


    if(loading && fileLoading) {
        return null
    }
    if(!service && !file) {
        return null
    }

    return (
        <div className={ styles.management_frame }>
            <div className={ styles.management_item }>
                <div className={[ styles.management__item, styles.management__item_action__title ].join(' ')}>
                    <span className={ styles.management__item_action__title }>서비스 관리</span>

                    <div>
                        <button>수정</button>
                    </div>
                </div>


                <div className={[ styles.management__item, styles.management__item_img ].join(' ')}>
                    { file?.result.map((item: any) => {
                        return ( <img src={ `http://calcs.kr:8000/upload/${item.filename}` } alt='' key={ item._id } /> )
                    }) }
                </div>

                
            </div>

            <div className={ styles.management_item }>
                <div className={[ styles.management__item, styles.management__item_action__title ].join(' ')}>
                    <span className={ styles.management__item_action__title }>서비스 관리</span>

                    <div className={ styles.management__item_action__button }>
                        <button onClick={() => setShowModal(!showModal)}>추가</button>
                        <button>삭제</button>
                        <button>수정</button>
                    </div>
                </div>

                <div className={[ styles.management__item, styles.management__item_table__head ].join(' ')}>
                    <input className={ styles.management__item_table__content } type='checkbox' />
                    <span className={ styles.management__item_table__content }>서비스 이름</span>
                    <span className={ styles.management__item_table__content }>형태</span>
                    <span className={ styles.management__item_table__content }>도메인</span>
                    <span className={ styles.management__item_table__content }>카테고리</span>
                    <span className={ styles.management__item_table__content }>프로젝트 기간</span>
                    <span className={ styles.management__item_table__content }>생성 일자</span>
                </div>

                { service?.result.map((item: any) => {
                    return (
                        <div className={[ styles.management__item, styles.management__item_table__body ].join(' ')} key={item._id}>
                            <input className={ styles.management__item_table__content } id={item._id} type='checkbox' />
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.name }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.tag }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.domain }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.category.name }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ `${item.startAt.split('T')[0].replaceAll('-', '.')} - ${item.endAt.split('T')[0].replaceAll('-', '.')}` }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.createAt.split('T')[0].replaceAll('-', '.') }</label>
                        </div>
                    )
                }) }
            </div>


            <div className={[ styles.management_item, showModal ? styles.management_item_add_act : styles.management_item_add ].join(' ')} onClick={ () => { setShowModal(!showModal) } }>
                <div className={ styles.management__item_modal_context } onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label>서비스 이름</label>
                        <input></input>
                    </div>

                    <div>
                        <label>서비스 설명</label>
                        <input></input>
                    </div>

                    <div>
                        <label>도메인</label>
                        <input></input>
                    </div>

                    <div>
                        <label>스택 선택</label>
                        <input></input>
                    </div>

                    <div>
                        <label>카테고리 선택</label>
                        <input></input>
                    </div>

                    <div>
                        <label>태그</label>
                        <input></input>
                    </div>

                    <div>
                        <label>팀</label>
                        <input></input>
                    </div>

                    <div>
                        <label>프로젝트 개발 기간</label>
                        <input></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manaegment
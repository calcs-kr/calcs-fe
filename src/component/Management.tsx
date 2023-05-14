// React
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Style
import styles from './Management.module.css'

import { useCookies } from 'react-cookie'

import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

// 설정 파일
import axios from 'axios'
import config from '../config'

function Manaegment() {
    ////// API 일괄 데이터 //////
	const state = useAPIState()
	const dispatch = useAPIDispatch()

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    // 캘린더 오픈 여부
    const [calendarIsOpen, setCalendarIsOpen] = useState(false)
    const calendarOpenHandle = () => {
        setCalendarIsOpen(!calendarIsOpen)
    }

    const [selectService, setSelectService] = useState<string[]>([])
    const selectHandler = (e: any) => {
        if(e.target.checked) {
            setSelectService([ ...selectService, e.target.id ])
        } else {
            const updateSelect = selectService.filter((item: string) => { return item !== e.target.id })
            setSelectService(updateSelect)
        }
    }

    const deleteService = async (e: any) => {
        const response: any = await axios({
            method: 'delete',
            url: `https://${config.CALCS_HOST}:${config.CALCS_BE}/service`, 
            data: { id: selectService }, 
            headers: {Authorization: `Bearer ${cookies.token}`}
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                //console.log(error.response.headers)
            }
            else if (error.request) {
                console.log(error.request)
            }
            else {
                console.log('Error', error.message)
            }
            console.log(error.config)
        })
        console.log(response.data)
        setSelectService([])
    }


    const [showModal, setShowModal] = useState(false)

    const [cookies, setCookie] = useCookies(['token'])

    const [fileLoading, setFileLoading] = useState(false)
    const [file, setFile] = useState<any>(null)

    const [tag, setTag] = useState<any>(null)

    // 서비스 추가 데이터
    const [formValues, setFormValues] = useState<any>({
        name: '',
        describe: '',
        domain: '',
        stack: [],
        category: '',
        team: '',
        tag: '',
        developmentPeriod: '',
        startAt: '',
        endAt: ''
    })

    const addInputChange = (e: any) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const addSelectChange = (e: any) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const addCalendarChange = (ranges: any) => {
        setFormValues({ ...formValues, startAt: dateToISOFormat(ranges.selection.startDate), endAt: dateToISOFormat(ranges.selection.endDate) })
        setCalendarDate(ranges.selection)
    }

    const addCheckboxChange = (e: any) => {
        if( e.target.checked ) {
            setFormValues({ ...formValues, stack: [...formValues.stack, e.target.id] })
        } else {
            const updatedStack = formValues.stack.filter((item: string) => { return item !== e.target.id })
            setFormValues({ ...formValues, stack: updatedStack })
        }
    }

    const dateToISOFormat = (date: Date) => {
        // KST 변환 추가
        date.setHours(9)
        return date.toISOString().split('T')[0].replaceAll('-', '.')
    }

    useEffect(() => {
        fileGet()
    }, [])


    const [calendarDate, setCalendarDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const [image, setImage] = useState<any>(null)

    const handleUpload = (event: any) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }

    async function serviceAdd() {
        const response: any = await axios.post(`https://${config.CALCS_HOST}:${config.CALCS_BE}/service`, 
        { name: formValues['name'],
        domain: formValues['domain'],
        describe: formValues['describe'],
        category: formValues['category'],
        stack: formValues['stack'],
        tag: formValues['tag'],
        team: formValues['team'],
        startAt: formValues['startAt'],
        endAt: formValues['endAt'] }, 
        { headers: {Authorization: `Bearer ${cookies.token}`}})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                //console.log(error.response.headers)
            }
            else if (error.request) {
                console.log(error.request)
            }
            else {
                console.log('Error', error.message)
            }
            console.log(error.config)
        })
        console.log(response.data)

        // 입력 값 초기화
        setShowModal(false)
        setFormValues({
            name: '',
            describe: '',
            domain: '',
            stack: [],
            category: '',
            team: '',
            tag: '',
            developmentPeriod: '',
            startAt: '',
            endAt: ''
        })
    }

    async function fileGet() {
        setFileLoading(true)
        let response: any = await axios.get(`https://${config.CALCS_HOST}:${config.CALCS_BE}/file`, { headers: {Authorization: `Bearer ${cookies.token}`}})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                //console.log(error.response.headers)
            }
            else if (error.request) {
                console.log(error.request)
            }
            else {
                console.log('Error', error.message)
            }
            console.log(error.config)
        })

        setFile(response.data.result)
        setFileLoading(false)


        
        response = await axios.get(`https://${config.CALCS_HOST}:${config.CALCS_BE}/service/tag`, { headers: {Authorization: `Bearer ${cookies.token}`}})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                //console.log(error.response.headers)
            }
            else if (error.request) {
                console.log(error.request)
            }
            else {
                console.log('Error', error.message)
            }
            console.log(error.config)
        })

        setTag(response.data.result)
    }


    if(loading && fileLoading) {
        return null
    }
    if(!service && !file && !tag) {
        return null
    }

    return (
        <div className={ styles.management_frame }>
            <div className={ styles.management_item }>
                <div className={[ styles.management__item, styles.management__item_action__title ].join(' ')}>
                    <span className={ styles.management__item_action__title }>이미지 관리</span>

                    <div>
                        <button>수정</button>
                    </div>
                </div>


                <div className={[ styles.management__item, styles.management__item_img ].join(' ')}>
                    { file?.map((item: any) => {
                        return ( <img src={ `https://calcs.kr:8000/upload/${item.filename}` } alt='' key={ item._id } /> )
                    }) }
                </div>

                
            </div>

            <div className={ styles.management_item }>
                <div className={[ styles.management__item, styles.management__item_action__title ].join(' ')}>
                    <span className={ styles.management__item_action__title }>서비스 관리</span>

                    <div className={ styles.management__item_action__button }>
                        <button onClick={() => setShowModal(!showModal)}>추가</button>
                        <button>수정</button>
                        <button onClick={deleteService}>삭제</button>
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

                { service?.map((item: any) => {
                    return (
                        <div className={[ styles.management__item, styles.management__item_table__body ].join(' ')} key={item._id}>
                            <input className={ styles.management__item_table__content } id={item._id} type='checkbox' onChange={selectHandler} />
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.name }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.tag.name }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.domain }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.category.name }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ `${item.startAt.split('T')[0].replaceAll('-', '.')} - ${item.endAt.split('T')[0].replaceAll('-', '.')}` }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.createAt.split('T')[0].replaceAll('-', '.') }</label>
                        </div>
                    )
                }) }
            </div>


            <div className={ styles.management_item }>
                <div className={[ styles.management__item, styles.management__item_action__title ].join(' ')}>
                    <span className={ styles.management__item_action__title }>카테고리 관리</span>

                    <div className={ styles.management__item_action__button }>
                        <button>추가</button>
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                </div>

                <div className={[ styles.management__item, styles.management__item_table__head ].join(' ')}>
                    <input className={ styles.management__item_table__content } type='checkbox' />
                    <span className={ styles.management__item_table__content }>카테고리 명</span>
                </div>

                { category?.map((item: any) => {
                    return (
                        <div className={[ styles.management__item, styles.management__item_table__body ].join(' ')} key={item._id}>
                            <input className={ styles.management__item_table__content } id={item._id} type='checkbox' />
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.name }</label>
                            <label className={ styles.management__item_table__content } htmlFor={item._id}>{ item.createAt.split('T')[0].replaceAll('-', '.') }</label>
                        </div>
                    )
                }) }
            </div>

            <div className={ styles.management_item }>
                <div className={[ styles.management__item, styles.management__item_action__title ].join(' ')}>
                    <span className={ styles.management__item_action__title }>스택 관리</span>

                    <div className={ styles.management__item_action__button }>
                        <button>추가</button>
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                </div>

                <div className={[ styles.management__item, styles.management__item_table__head ].join(' ')}>
                    <input className={ styles.management__item_table__content } type='checkbox' />
                    <span className={ styles.management__item_table__content }>카테고리 명</span>
                </div>

                { stack?.map((item: any) => {
                    return (
                        <div className={[ styles.management__item, styles.management__item_table__body ].join(' ')} key={`${item._id}_manage`}>
                            <input className={ styles.management__item_table__content } id={`${item._id}_manage`} type='checkbox' />
                            <label className={ styles.management__item_table__content } htmlFor={`${item._id}_manage`}>{ item.name }</label>
                        </div>
                    )
                }) }
            </div>


            <div className={[ styles.management_item, showModal ? styles.management_item_add_act : styles.management_item_add ].join(' ')} onClick={ () => { setShowModal(!showModal) } }>
                <div className={ styles.management__item_modal_context } onClick={(e) => e.stopPropagation()}>
                    <div className={ styles.management__item_add_image }>
                        <input id='imageUpload' type='file' onChange={handleUpload}></input>
                        <label htmlFor='imageUpload'>
                            <img src={image} alt='' />
                            <div className={ styles.management__item_add_image_text }>
                                <span>Upload to image</span>
                            </div>
                        </label>
                    </div>

                    <div className={ styles.management__item_add_data }>
                        <div className={ styles.management__item_add_data_insert }>
                            <div className={ styles.management__item_add_data__text }>
                                <label className={ styles.management__item_add_data__text_label }>서비스 이름</label>
                                <input name='name' value={formValues.name} onChange={addInputChange}></input>
                            </div>

                            <div className={ styles.management__item_add_data__text }>
                                <label className={ styles.management__item_add_data__text_label }>서비스 설명</label>
                                <input name='describe' value={formValues.describe} onChange={addInputChange}></input>
                            </div>

                            <div className={ styles.management__item_add_data__text }>
                                <label className={ styles.management__item_add_data__text_label }>도메인</label>
                                <input name='domain' value={formValues.domain} onChange={addInputChange}></input>
                            </div>

                            <div className={ styles.management__item_add_data__text }>
                                <label className={ styles.management__item_add_data__text_label }>스택 선택</label>
                                { stack?.map((item: any) => {
                                    return (
                                        <div className={ styles.management__item_add_data__text__stack } key={ item._id }>
                                            <input id={ item._id } onChange={addCheckboxChange} type='checkbox' />
                                            <label htmlFor={ item._id }>{item.name}</label>
                                        </div>
                                    )
                                }) }
                            </div>

                            <div className={ styles.management__item_add_data__text }>
                                <label className={ styles.management__item_add_data__text_label }>카테고리</label>
                                <select value={formValues.category} name='category' onChange={addSelectChange}>
                                    <option value='' disabled>카테고리를 선택하세요</option>
                                    { category?.map((item: any) => {
                                        return ( <option value={item._id} key={item._id}>{item.name}</option> )
                                    }) }
                                </select>
                            </div>

                            <div className={ styles.management__item_add_data__text }>
                                <label className={ styles.management__item_add_data__text_label }>태그</label>
                                <select value={formValues.tag} name='tag' onChange={addSelectChange}>
                                    <option value='' disabled>태그를 선택하세요</option>
                                    { tag?.map((item: any) => {
                                        return ( <option value={item._id} key={item._id}>{item.name}</option> )
                                    }) }
                                </select>
                            </div>

                            <div className={ styles.management__item_add_data__text }>
                                <label className={ styles.management__item_add_data__text_label }>팀</label>
                                <input name='team' value={formValues.team} onChange={addInputChange}></input>
                            </div>

                            <div className={ styles.management__item_add_data__text } onClick={calendarOpenHandle}>
                                <label className={ styles.management__item_add_data__text_label }>프로젝트 개발 기간</label>
                                <input name='developmentPeriod' className={ styles.management__item_add_data__text_input } value={`${formValues.startAt} - ${formValues.endAt}`} disabled></input>
                            </div>

                            <div className={[ styles.management__item_add_data__calendar, calendarIsOpen ? styles.management__item_add_data__calendar_active : styles.management__item_add_data__calendar_disable ].join(' ')}>
                                <DateRange editableDateInputs={true} moveRangeOnFirstSelection={false} ranges={[calendarDate]} dateDisplayFormat='yyyy.MM.dd' onChange={addCalendarChange} />
                            </div>
                        </div>

                        <div className={ styles.management__item_add_data_action }>
                            <span onClick={ serviceAdd }>완료</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manaegment
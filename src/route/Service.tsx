// 설정 파일
import axios from 'axios'
import config from '../config'

// React
import { useEffect } from 'react'

// Context
import { useAPIDispatch } from '../context/APIContext'
import Header from '../component/Header'
import Tool from '../component/Tool'

function Service() {
    ////// API 일괄 데이터 //////
	// const state = useAPIState()
	const dispatch = useAPIDispatch()

    // 데이터 조회 함수
    const getBatchData = async () => {
        try {
            dispatch({ type: 'LOADING' })
            const service  = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service`)
            const category = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/category`)
            const snapshot = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/snapshot`)
            const status   = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/status`)
            const stack    = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/stack`)

            setTimeout( async function() {
                try {
                    dispatch({ type: 'SUCCESS', service: service.data, category: category.data, snapshot: snapshot.data, status: status.data, stack: stack.data })
                } catch (err) {
                    console.log(err)
                }
            }, 0.5 * 1000)
        } catch (e) {
            dispatch({ type: 'ERROR', error: e })
        }
    }

    useEffect(() => {
        getBatchData()
    })

    return (
        <div>
            <Header />
            <Tool />
        </div>
    )
}
export default Service
// 설정 파일
import axios from 'axios';
import config from '../config'

// React
import { useEffect } from 'react';

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext';


function Tool() {
	// API State & Dispatch
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 데이터 조회 함수
	async function getData() {
		try {
			dispatch({ type: 'LOADING' })
			const service  = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service`)
			const category = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/category`)
			const snapshot = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/snapshot`)
			const status   = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/status`)
			const stack    = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/stack`)
			dispatch({ type: 'SUCCESS', service: service.data, category: category.data, snapshot: snapshot.data, status: status.data, stack: stack.data })
		} catch (e) {
			dispatch({ type: 'ERROR', error: e })
		}
	}

	useEffect(() => {
		getData()
	}, [])


	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state


	if( loading ) return (<div>1</div>)
	if( error ) return (<div>1</div>)
	if( !service && !category && !snapshot && !status && !stack ) return (<div>1</div>)

	return (
		<div>
			<p>123</p>
			{ category?.result.map((item: any, index: number) => {
				return (
					<p key={index}>{item.name}</p>
				)
			}) }
		</div>
	)
}

export default Tool;
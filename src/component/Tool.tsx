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
			const response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/resource/cpu`)
			dispatch({ type: 'SUCCESS', data: response.data })
		} catch (e) {
			dispatch({ type: 'ERROR', error: e })
		}
	}

	useEffect(() => {
		getData()
	}, [])


	// 조회된 데이터 정의
	const { loading, data, error } = state

	if( loading ) return (<div>1</div>)
	if( error ) return (<div>1</div>)
	if( !data ) return (<div>1</div>)

	return (
		<div>
			<p>123</p>
			{ data.result.map((item: { cpu: number }, index: number) => {
				return (
					<p key={index}>{item.cpu}</p>
				)
			}) }
		</div>
	)
}

export default Tool;
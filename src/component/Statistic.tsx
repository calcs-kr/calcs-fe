// 설정 파일
import axios from 'axios'
import config from '../config'

// React
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './Statistic.module.css'
import ChartCalnder from './chart/ChartCalnder'
import ChartMap from './chart/ChartMap'
import { StatisticSkeleton } from './StatisticSkeleton'

function Statistic() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

	const color = [ '#2D3D5F', '#455478', '#5E6C92', '#7885AC', '#929FC8', '#ADBAE4' ]

    const [memGraphStatus, setMemGraphStatus] = useState(false)
    const [viewGraphStatus, setViewGraphStatus] = useState(false)

	/*
    mem?.map((item: any, index: number) => {
        if( index >= 7 ) { return null }
        memForDay[0].data.push({ 'x': item.createAt.split('T')[1].slice(0, 5), 'y': item.mem })
    })
	*/
    

    return (
		<div className={ styles.statistic_frame }>
			{ (loading)
			? <StatisticSkeleton />
			: <>
			<div className={ styles.statistic_detail }>
				<div className={ styles.statistic_item__frame }>
					<span className={ styles.statistic_item__frame_title_text }>Total Service</span>
					<div className={ styles.statistic_item__frame_space }></div>
					<span className={ styles.statistic_item__frame_value }>{ service?.result.length.toString().padStart(2, '0') }</span>
				</div>

				<img className={ styles.statistic_item__frame_img } src='/icon/icon.png' alt='' />
			</div>
			<div className={ styles.statistic_detail }>
				<div className={ styles.statistic_item__frame }>
					<div className={ styles.statistic_item__frame_title }>
						<span className={ styles.statistic_item__frame_title_text }>New Service</span>
						<span className={ styles.statistic_item__frame_title_text_ }>(7day)</span>
					</div>
					<div className={ styles.statistic_item__frame_space }></div>
					<span className={ styles.statistic_item__frame_value }>01</span>
				</div>

				<img className={ styles.statistic_item__frame_img } src='/icon/icon.png' alt='' />
			</div>
			<div className={ styles.statistic_detail }>
				<div className={ styles.statistic_item__frame }>
					<span className={ styles.statistic_item__frame_title_text }>Total Traffic</span>
					<div className={ styles.statistic_item__frame_space }></div>
					<span className={ styles.statistic_item__frame_value }>101,762</span>
				</div>

				<img className={ styles.statistic_item__frame_img } src='/icon/icon.png' alt='' />
			</div>

			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__traffic_top, styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>Word Traffic</span>
					<Link className={ styles.statistic_item__section_link } to='/login'>View More &gt;</Link>
				</div>

				<div className={ styles.statistic_item__traffic_mid }>
					<ChartMap />
				</div>

				<div className={ styles.statistic_item__traffic_btm }>
					<div className={ styles.statistic_item__traffic_btm_table }>
						<div className={ styles.statistic_item__traffic_btm_table_head }>
							<span className={ styles.statistic_item__traffic_btm_table_head__rank }>Rank</span>
							<span className={ styles.statistic_item__traffic_btm_table_head__country }>Country</span>
							<span className={ styles.statistic_item__traffic_btm_table_head__view }>View</span>
						</div>

						{ /*traffic.map((item, index) => {
							if( index >= 7 ) return null
							return (
								<div className={ styles.statistic_item__traffic_btm_table_body } key={ item._id }>
									<span className={ styles.statistic_item__traffic_btm_table_body__rank }>01</span>
									<span className={ styles.statistic_item__traffic_btm_table_body__country }>Korean</span>
									<span className={ styles.statistic_item__traffic_btm_table_body__view }>365</span>
								</div>
							)
						} ) */}
					</div>
				</div>
			</div>

			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>Project Schdule</span>
					<Link className={ styles.statistic_item__section_link } to='/login'>View More &gt;</Link>
				</div>

				<div className={ styles.statistic_item__schdule_mid }>
					<div className={ styles.statistic_item__schdule_mid_chart }>
						{ (!service)
						? <span>1</span>
						: <ChartCalnder data={service.result} />
						}
					</div>

					<div className={ styles.statistic_item__schdule_mid_table }>
						<div className={ styles.statistic_item__schdule_mid_table_head }>
							<span className={ styles.statistic_item__schdule_mid_table_head__rank }>Rank</span>
							<span className={ styles.statistic_item__schdule_mid_table_head__country }>Project</span>
							<span className={ styles.statistic_item__schdule_mid_table_head__view }>Days</span>
						</div>

						{ service?.result.map((item: any, index) => {
							if( index >= 5 ) return false
							return (
								<div className={ styles.statistic_item__schdule_mid_table_body } key={ item._id }>
									<span className={ styles.statistic_item__schdule_mid_table_body__rank }>{ index.toString().padStart(2, '0') }</span>
									<span className={ styles.statistic_item__schdule_mid_table_body__country }>{ item.name }</span>
									<span className={ styles.statistic_item__schdule_mid_table_body__view }>20</span>
								</div>
							)
						} )}
					</div>
				</div>

				<div className={ styles.statistic_item__schdule_btm }>
					{ service?.result.map((item: any, index) => {
						if( index >= 14 ) return false
						return (
							<div className={ styles.statistic_item__schdule_btm_frame } key={ item._id }>
								<div className={ styles.statistic_item__schdule_btm_box }></div>
								<span className={ styles.statistic_item__schdule_btm_text }>{ item.name }</span>
							</div>
						)
					} )}
				</div>
			</div>

			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__memory_top, styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>Memory Usage</span>
					<div className={ styles.statistic_item__memory_top_division }>
						<div className={
							(!memGraphStatus) 
							? styles.statistic_item__memory_top_division__active 
							: styles.statistic_item__memory_top_division__deactive } 
							onClick={ () => setMemGraphStatus(false) }>
							<span>일간</span>
						</div>
						<div className={
							(memGraphStatus)
							? styles.statistic_item__memory_top_division__active 
							: styles.statistic_item__memory_top_division__deactive } 
							onClick={ () => setMemGraphStatus(true) }>
							<span>주간</span>
						</div>
					</div>
				</div>

				<div className={ styles.statistic_item__memory_mid }>
					{ /* (!memGraphStatus)
					? <ChartLine data={memForDay} />
						: <ChartLine data={data1} /> */}
				</div>
			</div>



			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__view_top, styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>View Time</span>
					<div className={ styles.statistic_item__memory_top_division }>
						<div className={ 
							(!viewGraphStatus)
							? styles.statistic_item__memory_top_division__active
							: styles.statistic_item__memory_top_division__deactive }
							onClick={ () => setViewGraphStatus(false) }>
							<span>주간</span>
						</div>
						<div className={ 
							(viewGraphStatus)
							? styles.statistic_item__memory_top_division__active 
							: styles.statistic_item__memory_top_division__deactive }
							onClick={ () => setViewGraphStatus(true) }>
							<span>월간</span>
						</div>
					</div>
				</div>

				<div className={ styles.statistic_item__memory_mid }>
					{ /*(!viewGraphStatus)
					? <ChartBar data={data2} />
						: <ChartBar data={data2} /> */ }
				</div>
			</div>
			</> 
			}
		</div>
    )
}

export default Statistic
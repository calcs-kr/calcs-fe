// React
import { React, useContext, useState } from 'react'
import ChartBar from '../charts/ChartBar';
import ChartCalnder from '../charts/ChartCalnder';
import ChartLine from '../charts/ChartLine';
import ChartMap from '../charts/ChartMap';

// Context
import { APIContext } from '../content/APIProvider'

// Style
import styles from './Statistic.module.css';
import { ScheduleContext } from '../content/ScheduleProvider';
import { Link } from 'react-router-dom';
import { TrafficContext } from '../content/TrafficProvider';
import { ResourceContext } from '../content/ResourceProvider';

function Statistic() {
    const color = [ '#2D3D5F', '#455478', '#5E6C92', '#7885AC', '#929FC8', '#ADBAE4' ]

    const [service, category, snapshot, status] = useContext(APIContext)
    const [cpu, mem] = useContext(ResourceContext)
    const schedule = useContext(ScheduleContext)
    const traffic = useContext(TrafficContext)

    const [memGraphStatus, setMemGraphStatus] = useState(false)
    const [viewGraphStatus, setViewGraphStatus] = useState(false)

    let memForDay  = [{ id: 'day', data: [
    ] }]
    let memForWeek = [{ id: 'day', data: [
        { 'day': 'Mon', 'views': 20 }
    ] }]

    mem.map((item, index) => {
        if( index >= 7 ) { return null }
        memForDay[0].data.push({ 'x': item.createAt.split('T')[1].slice(0, 5), 'y': item.mem })
    })


    let viewForWeek  = []
    let viewForMonth = [
        { 'day': 'Mon', 'views': 20 }
    ]


    let data1 = [{ id: 'a', data: [
        { x: 'Mon', y: 100 },
        { x: 'Tue', y: 7 },
        { x: 'Wed', y: 5 },
        { x: 'Thu', y: 11 },
        { x: 'Fir', y: 9 },
        { x: 'Sat', y: 13 },
        { x: 'Sun', y: 16 }, ],}]


        const data2 = [
            {
                "day": "Mon",
                "views": 65,
            },
            {
                "day": "Tue",
                "views": 23,
            },
            {
                "day": "Wed",
                "views": 7,
            },
            {
                "day": "Thu",
                "views": 38,
            },
            {
                "day": "Fri",
                "views": 88,
            },
            {
                "day": "Sat",
                "views": 7,
            },
            {
                "day": "Sun",
                "views": 70,
            },
        ]
    
    return (
        <div className={ styles.statistic_frame }>
            <div className={ styles.statistic_detail }>
                <div className={ styles.statistic_item__frame }>
                    <span className={ styles.statistic_item__frame_title_text }>Total Service</span>
                    <div className={ styles.statistic_item__frame_space }></div>
                    <span className={ styles.statistic_item__frame_value }>{ service.length.toString().padStart(2, '0') }</span>
                </div>

                <img className={ styles.statistic_item__frame_img } src='/images/icon.png' alt='' />
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

                <img className={ styles.statistic_item__frame_img } src='/images/icon.png' alt='' />
            </div>
            <div className={ styles.statistic_detail }>
                <div className={ styles.statistic_item__frame }>
                    <span className={ styles.statistic_item__frame_title_text }>Total Traffic</span>
                    <div className={ styles.statistic_item__frame_space }></div>
                    <span className={ styles.statistic_item__frame_value }>101,762</span>
                </div>

                <img className={ styles.statistic_item__frame_img } src='/images/icon.png' alt='' />
            </div>

            <div className={ styles.statistic_detail }>
                <div className={[ styles.statistic_item__traffic_top, styles.statistic_item__top ].join(' ') }>
                    <span className={ styles.statistic_item__section_title }>Word Traffic</span>
                    <Link to='/login'>View More ></Link>
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

                        { traffic.map((item, index) => {
                            if( index >= 7 ) return null
                            return (
                                <div className={ styles.statistic_item__traffic_btm_table_body } key={ item._id }>
                                    <span className={ styles.statistic_item__traffic_btm_table_body__rank }>01</span>
                                    <span className={ styles.statistic_item__traffic_btm_table_body__country }>Korean</span>
                                    <span className={ styles.statistic_item__traffic_btm_table_body__view }>365</span>
                                </div>
                            )
                        } )}
                    </div>
                </div>
            </div>

            <div className={ styles.statistic_detail }>
                <div className={[ styles.statistic_item__top ].join(' ') }>
                    <span className={ styles.statistic_item__section_title }>Project Schdule</span>
                    <Link to='/login'>View More ></Link>
                </div>

                <div className={ styles.statistic_item__schdule_mid }>
                    <div className={ styles.statistic_item__schdule_mid_chart }>
                        <ChartCalnder data={service} />
                    </div>

                    <div className={ styles.statistic_item__schdule_mid_table }>
                        <div className={ styles.statistic_item__schdule_mid_table_head }>
                            <span className={ styles.statistic_item__schdule_mid_table_head__rank }>Rank</span>
                            <span className={ styles.statistic_item__schdule_mid_table_head__country }>Project</span>
                            <span className={ styles.statistic_item__schdule_mid_table_head__view }>Days</span>
                        </div>

                        { service.map((item, index) => {
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
                    { service.map((item, index) => {
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
                    { (!memGraphStatus)
                    ? <ChartLine data={memForDay} />
                    : <ChartLine data={data1} /> }
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
                    { (!viewGraphStatus)
                    ? <ChartBar data={data2} />
                    : <ChartBar data={data2} /> }
                </div>
            </div>
        </div>
    )
}
export default Statistic

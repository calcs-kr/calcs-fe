import axios from 'axios'
import config from '../config'
import React, { useState, useEffect } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'

function ChartCalnder(props) {
    let schedule = []

    // 캘린더 데이터 형태 변경
    props.data.map((item) => { schedule = [ ...schedule, ...getDatesStartToLast(item.startAt, item.endAt, item.seq) ] })

    // 시작과 끝을 작성하면 모든 날짜의 데이터 생성
    function getDatesStartToLast(startDate, lastDate, service) {
        var result = []
        var curDate = new Date(startDate)
        while(curDate <= new Date(lastDate)) {
            result.push({ value: service, day: curDate.toISOString().split('T')[0] })
            curDate.setDate(curDate.getDate() + 1)
        }
        return result
    } 

    const from = "2022"
    const to   = "2022"

    return (
        <ResponsiveCalendar 
            from={from}
            to={to}
            data={schedule}
            minValue="auto"
            maxValue="auto"
            emptyColor="#FFFFFF"
            colors={[ '#2D3D5F', '#455478', '#5E6C92', '#7885AC', '#929FC8', '#ADBAE4' ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#EDEEF1"
            dayBorderWidth={2}
            dayBorderColor="#EDEEF1"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
    )
}

export default ChartCalnder
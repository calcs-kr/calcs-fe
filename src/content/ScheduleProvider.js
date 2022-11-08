import axios from 'axios'
import config from '../config'
import React, { useState, useEffect, createContext } from 'react'

export const ScheduleContext = createContext()
export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState(null)
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // reset data
                setError(null) 
                setSchedule(null) 
                
                // loading to true
                setLoading(true) 

                // set data
                const response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/schedule`)                
                setSchedule(response.data.result)
            } catch (e) {
                setError(e) 
            }
            setLoading(false) 
        } 
        fetchUsers() 
    }, []) 

    if (loading) return <div></div>
    if (error) return <div></div>
    if (!schedule) return <div></div>

    return (
        <ScheduleContext.Provider value={ schedule }>
            { children }
        </ScheduleContext.Provider>
    )
}
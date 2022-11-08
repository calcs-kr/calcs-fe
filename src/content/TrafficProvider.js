import axios from 'axios'
import config from '../config'
import React, { useState, useEffect, createContext } from 'react'

export const TrafficContext = createContext()
export const TrafficProvider = ({ children }) => {
    const [traffic, setTraffic] = useState(null)
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // reset data
                setError(null) 
                setTraffic(null) 
                
                // loading to true
                setLoading(true) 

                // set data
                const response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/resource/traffic`)                
                setTraffic(response.data.result)
            } catch (e) {
                setError(e) 
            }
            setLoading(false) 
        } 
        fetchUsers() 
    }, []) 

    if (loading) return <div></div>
    if (error) return <div></div>
    if (!traffic) return <div></div>

    return (
        <TrafficContext.Provider value={ traffic }>
            { children }
        </TrafficContext.Provider>
    )
}
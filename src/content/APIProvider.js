import axios from 'axios'
import config from '../config'
import React, { useState, useEffect, createContext } from 'react'

export const APIContext = createContext()
export const APIProvider = ({ children }) => {
    const [service, setService]   = useState(null)
    const [status, setStatus]     = useState(null)
    const [category, setCategory] = useState(null)
    const [snapshot, setSnapshot] = useState(null)
    const [stack, setStack]       = useState(null)
    const [loading, setLoading]   = useState(false) 
    const [error, setError]       = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // reset data
                setError(null) 
                setCategory(null) 
                
                // loading to true
                setLoading(true) 

                // set data
                let response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/category`)
                setCategory(response.data.result)

                // set data
                response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/status`)
                setStatus(response.data.result)

                // set data
                response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/snapshot`)
                setSnapshot(response.data.result)

                // set data
                response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service`)
                setService(response.data.result)

                response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/service/stack`)
                setStack(response.data.result)
            } catch (e) {
                setError(e) 
            }
            setLoading(false) 
        } 
        fetchUsers() 
    }, []) 

    if (loading) return <div></div>
    if (error) return <div></div>
    if (!category && !snapshot && !status && !service) return <div></div>

    return (
        <APIContext.Provider value={[ service, category, snapshot, status, stack ]}>
            { children }
        </APIContext.Provider>
    )
}
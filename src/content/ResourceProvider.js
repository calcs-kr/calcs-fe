import axios from 'axios'
import config from '../config'
import React, { useState, useEffect, createContext } from 'react'

export const ResourceContext = createContext()
export const ResourceProvider = ({ children }) => {
    const [cpu, setCPU] = useState(null)
    const [mem, setMEM] = useState(null)
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // reset data
                setError(null) 
                setCPU(null) 
                setMEM(null) 
                
                // loading to true
                setLoading(true) 

                // set data
                let response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/resource/cpu`)
                setCPU(response.data.result)

                // set data
                response = await axios.get(`http://${config.CALCS_HOST}:${config.CALCS_BE}/resource/mem`)
                setMEM(response.data.result)
            } catch (e) {
                setError(e) 
            }
            setLoading(false) 
        } 
        fetchUsers() 
    }, []) 

    if (loading) return <div></div>
    if (error) return <div></div>
    if (!cpu && !mem) return <div></div>

    return (
        <ResourceContext.Provider value={[ cpu, mem ]}>
            { children }
        </ResourceContext.Provider>
    )
}
// React
import { React, useContext, useEffect, useState } from 'react'
import ChartPie from '../charts/ChartPie';

// Context
import { APIContext } from '../content/APIProvider'

// Style
import styles from './Nav.module.css';

function Nav() {
    const [service, category, snapshot, status] = useContext(APIContext)

    return (
        <nav>
            <div className={ styles.nav_frame }>
            </div>
        </nav>
    )
}
export default Nav

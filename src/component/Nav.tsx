// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'
import { useAPISearchState, useAPISearchDispatch } from '../context/SearchContext'

// Style
import styles from './Nav.module.css'

function Nav() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	////// API 검색 일괄 데이터 //////
	const searchState = useAPISearchState();
	const searchDispatch = useAPISearchDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state
	const { searchLoading, search, searchError } = searchState


    return (
        <nav>
            <div className={ styles.nav_frame }></div>
        </nav>
    )
}

export default Nav
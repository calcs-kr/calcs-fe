// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Context
import Loading from '../component/Loading';

import Header from '../component/Header'

import Footer from '../component/Footer';
import StoneSearch from '../component/StoneSearch';


function Stone() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    return (
        <>
            <Loading loading={ false } />
            <div>
                <Header scrollMotion={ false } />

                
                <StoneSearch />
                
                <Footer />
            </div>
        </>
    )
}
export default Stone
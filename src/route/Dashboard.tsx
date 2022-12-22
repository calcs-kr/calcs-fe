// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Context
import Header from '../component/Header'
import Nav from '../component/Nav'
import Statistic from '../component/Statistic'
import Loading from '../component/Loading';




function Dashboard() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    return (
        <>
            <Loading loading={ !service } />
            <div>
                <Header />
                <Nav />
                <Statistic />
            </div>
        </>
    )
}
export default Dashboard
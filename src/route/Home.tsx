// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Context
import Header from '../component/Header'
import Loading from '../component/Loading';
import MainSplash from '../component/MainSplash';




function Home() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, snapshot, status, stack, error } = state

    return (
        <>
            <Loading loading={ false } />
            <div>
                <Header />
                <MainSplash />
            </div>
        </>
    )
}
export default Home
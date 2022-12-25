// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Context
import Loading from '../component/Loading';

import Header from '../component/Header'
import MainSplash from '../component/MainSplash';

import StoneList from '../component/StoneList';
import MountainList from '../component/MountainList';
import StoneForKeyWord from '../component/StoneForKeyword';
import Footer from '../component/Footer';


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
                <Header scrollMotion={ true } />
                <MainSplash />

                <StoneList />
                <MountainList />
                <StoneForKeyWord />

                <Footer />
            </div>
        </>
    )
}
export default Home
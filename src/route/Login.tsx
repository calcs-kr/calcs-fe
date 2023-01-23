// Context
import { useAPIState, useAPIDispatch } from '../context/APIContext'

// Context
import Header from '../component/Header'
import Footer from '../component/Footer';
import UserForm from '../component/UserForm';


function Login() {
    ////// API 일괄 데이터 //////
	const state = useAPIState();
	const dispatch = useAPIDispatch();

	// 조회된 데이터 정의
	const { loading, service, category, stack, error } = state

    return (
        <>
            <div>
                <Header />
                <UserForm />
                <Footer />
            </div>
        </>
    )
}
export default Login
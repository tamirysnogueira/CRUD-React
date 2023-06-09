import Form from '../components/Form';
import Welcome from '../components/Welcome';

import { ModalProvider } from "../contexts/ModalContext";

import { Link } from 'react-router-dom';

import '../styles/authenticationPages/authenticationPage.css';

function Login() {

    return (
        <section className='containerAuthentication'>
            <Welcome />

            <div className='userForm'>
                <div className='description'>
                    <div className='descriptionUserForm'>
                        <h1>Sign in</h1>
                        <p>Welcome back!</p>
                    </div>


                    <ModalProvider>
                        <Form typeForm='Login'></Form>
                    </ModalProvider>

                    <Link to='/'> Don't have account? <span>Sign up</span> </Link>
                </div>
            </div>

        </section>

    );
}

export default Login;
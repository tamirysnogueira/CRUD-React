import Form from '../components/Form';
import Welcome from '../components/Welcome';

import { ModalProvider } from "../contexts/ModalContext";
import { Link } from 'react-router-dom';

import '../styles/authenticationPages/authenticationPage.css';

function Register() {

    return (
        <section className='containerAuthentication'>
            <Welcome />

            <div className='userForm'>
                <div className='description'>
                    <div className='descriptionUserForm'>
                        <h1>Sign up</h1>
                        <p>Welcome to the Page! Please enter data to register</p>
                    </div>


                    <ModalProvider>
                        <Form typeForm='Register'></Form>
                    </ModalProvider>


                    <Link to='/login'> Already have an account? <span>Sign in</span> </Link>
                </div>
            </div>

        </section>
    );
}

export default Register;

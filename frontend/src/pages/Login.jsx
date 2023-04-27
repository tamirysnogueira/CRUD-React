import Welcome from '../components/Welcome';
import Form from '../components/Form';

import '../styles/loginPage/containerLogin.css';

function Login() {

  return (
    <div className='containerLogin'>
      <Welcome></Welcome>

      <section className='Login'>
            <div className='description'>
                <div className='descriptionLogin'>
                    <h1>Sign in</h1>
                    <p>Login to manager your account</p>
                </div>
                

                <Form typeForm='Register'></Form>
            </div>
      </section>
    </div>
    
  );
}

export default Login;

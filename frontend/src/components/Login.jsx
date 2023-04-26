import '../styles/Login.css'
import Form from './Form'

const Login = () => {
    
    return (
        <section className='Login'>
            <div className='description'>
                <div className='descriptionLogin'>
                    <h1>Sign in</h1>
                    <p>Login to manager your account</p>
                </div>
                

                <Form></Form>
            </div>
        </section>
    )
}

export default Login
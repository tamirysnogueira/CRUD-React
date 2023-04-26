import { useState } from 'react'
import Button from './Button'
import '../styles/Form.css'

const Form = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    
    return (
        <form method='POST' action='/login' className='Form'>
            <input type="text" name="Name" placeholder='Your name' value={name} onChange={(event) => setName(event.target.value)}/>

            <input type="email" name="Email" placeholder='you@hotmail.com' value={email} onChange={(event) => setEmail(event.target.value)}/>

            <input type="password" name="Password" placeholder='At latest 8 characters' value={password} onChange={(event) => setPassword(event.target.value)}/>

            
            <Button></Button>
        </form>
    )
}

export default Form
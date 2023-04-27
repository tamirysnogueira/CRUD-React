import { useForm } from "react-hook-form";
import axios from "axios"

import '../styles/componentsStyles/Form.css'

const Form = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    function submitLoginForm(data) {
        
    }

    async function submitRegistrationForm(data) {
        const {name, email, password} = data

        const createUser = await axios
            .post('http://localhost:3333/makeUser', {
                name,
                email,
                password

            })
            .then((res) => console.log(res.data))
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <form className='Form' onSubmit={handleSubmit(props.typeForm === 'Register' ? submitRegistrationForm : submitLoginForm)}>

            {props.typeForm === 'Register' && (
                <label>
                    <input 
                    className={errors?.name && 'inputNotValid'}
                    type="text" 
                    name="Name" 
                    placeholder='Your name' 
                    {...register("name", { minLength: 3, required: true})}
                    />
                    {errors.name?.type === 'minLength' && <p role="alert">First name is required</p>}
                </label>
                
            )}

            <label>
                <input 
                    className={errors?.email && 'inputNotValid'}
                    type="email" 
                    name="Email" 
                    placeholder='you@hotmail.com' 
                    {...register("email", { pattern: /^\S+@\S+\.\S+$/, required: true})}  
                />

            </label>

            <label>
                <input 
                    className={errors?.password && 'inputNotValid'}
                    type="password" 
                    name="Password" 
                    placeholder='At latest 8 characters' 
                    {...register("password", { minLength: 8, required: true})}
                />

            </label>

            
            <button className='ButtonAble' type='submit'>
                {props.typeForm}
            </button>
        </form>
    )
}

export default Form
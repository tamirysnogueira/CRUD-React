import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";
import { ModalContext } from "../contexts/ModalContext";
import { AuthContext } from "../contexts/AuthenticationContext";
import { useContext, useState } from "react";

import { FiMail, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

import '../styles/componentsStyles/Form.css'

export default function Form(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const { modal, makeModal } = useContext(ModalContext)
    const { signIn } = useContext(AuthContext)

    const [hiddenPassword, SetHiddenPassword] = useState('password')
    const [typePassword, SetTypePassword] = useState(false)


    async function handleAuthRequest(data, endpoint) {
        const { email, password } = data

        try {
            const response = await api.post(endpoint, { email, password })
            return response

        } catch (err) {
            throw makeModal(err.response)
        }
    }

    async function submitLoginForm(data) {
        const token = await handleAuthRequest(data, '/login')

        signIn(token.data, data.email)

    }

    async function submitRegistrationForm(data) {
        try {

            const response = await api.post('/makeUser', data)
            makeModal(response)
            setTimeout(() => navigate('/login'), 3000)

        } catch (err) {
            makeModal(err.response)
        }
    }

    function isPassword(type) {
        if (type) {
            SetHiddenPassword('password')
            SetTypePassword(type)
        } else {
            SetHiddenPassword('text')
            SetTypePassword(type)
        }
    }

    return (
        <>
            {modal && <Modal />}

            <form className='Form' onSubmit={handleSubmit(props.typeForm === 'Register' ? submitRegistrationForm : submitLoginForm)}>

                {props.typeForm === 'Register' && (
                    <label>
                        <div>
                            <input
                                className={errors?.name && 'inputNotValid'}
                                type="text"
                                name="Name"
                                placeholder='Your name'
                                {...register("name", { minLength: 3, required: true })}
                            />
                            <FiUser />

                        </div>
                        {errors.name?.type === 'minLength' && <p role="alert">Name have 3 caracteres</p>}
                        {errors.name?.type === 'required' && <p role="alert">Name is required</p>}
                    </label>



                )}
                <label>
                    <div>
                        <input
                            className={errors?.email && 'inputNotValid'}
                            type="email"
                            name="Email"
                            placeholder='you@hotmail.com'
                            {...register("email", { pattern: /^\S+@\S+\.\S+$/, required: true })}

                        />
                        <FiMail />
                    </div>

                    {errors.email?.type === 'required' && <p >First name is required</p>}
                    {errors.email?.type === 'pattern' && <p>Invalid email address</p>}
                </label>


                <label>
                    <div>
                        <input
                            className={errors?.password && 'inputNotValid'}
                            type={hiddenPassword}
                            name="Password"
                            placeholder='At latest 8 characters'
                            {...register("password", { minLength: 8, required: true })}
                        />
                        {
                            typePassword ? <FiEyeOff onClick={() => isPassword(false)} /> : <FiEye onClick={() => isPassword(true)} />
                        }
                    </div>

                    {errors.password?.type === 'required' && <p >Password is required</p>}
                    {errors.password?.type === 'minLength' && <p >Password is have 8 caracteres</p>}
                </label>


                <button type='submit' className="buttonForm">
                    {props.typeForm}
                </button>
            </form>

        </>

    )
}
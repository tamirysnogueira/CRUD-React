import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [tokenAdmin, setTokenAdmin] = useState(``)
    const [tokenUser, setTokenUser] = useState('')
    const [emailUser, setEmailUser] = useState(``)
    const [shouldNavigate, setShouldNavigate] = useState(false)

    const signIn = (token, email) => {
        if(email === 'admin@hotmail.com'){
            setTokenAdmin(`${token}`)
            setEmailUser(`${email}`)

        } else {
            setEmailUser(`${email}`)
            setTokenUser(`${token}`)
        }

        setShouldNavigate(true)
    }

    const logout = () => {
        setTokenAdmin(``)
        setEmailUser(``)
        setEmailUser(``)
        setShouldNavigate(false)

        navigate('/login')
    }

    const handleNavigation = () => {
        if (shouldNavigate) {
            navigate('/myProfile')
        }
    }

    useEffect(handleNavigation, [shouldNavigate])

    return (
        <AuthContext.Provider value={{ tokenAdmin, tokenUser, emailUser, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
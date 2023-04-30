import {createBrowserRouter} from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import MyProfile from '../pages/myProfile'
import { AuthProvider } from '../contexts/AuthenticationContext'
import { ModalProvider } from '../contexts/ModalContext'

export const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <AuthProvider><Register /></AuthProvider>
    },
    {
        path: '/login',
        element: <AuthProvider><Login /></AuthProvider> 
    },
    {
        path: '/myProfile',
        element: <AuthProvider><ModalProvider><MyProfile /></ModalProvider></AuthProvider> 
    }
])
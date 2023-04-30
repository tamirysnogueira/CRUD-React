import { createContext, useState } from "react";

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null)
    const [message, setMessage] = useState('')
    const [modalName, setModalName] = useState('')

    const makeModal = (user) => {
        if (user.status === 201 || user.status === 200) {
            setModal(true);
            setMessage(`${user.data}`);
            setModalName('ModalSuccess')

            setTimeout(() => {
                setMessage("");
                setModal(false)
            }, 5000);
        } else {
            setModal(true);
            setMessage(`${user.data}`);
            setModalName('ModalError')

            setTimeout(() => {
                setMessage("");
                setModal(false)
            }, 5000);
        }
    }

    return (
        <ModalContext.Provider value={{ modal, message, modalName, makeModal, setMessage }}>
            {children}
        </ModalContext.Provider>
    )
}
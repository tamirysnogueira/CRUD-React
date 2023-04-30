import { ModalContext } from "../contexts/ModalContext";
import { useContext } from "react";

import '../styles/componentsStyles/Modal.css'

export default function Modal() {
    const { message, modalName } = useContext(ModalContext)

    return (
        <div className={modalName}>
            <p>{message} </p>
        </div>
    )

}
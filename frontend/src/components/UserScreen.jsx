import { AuthContext } from "../contexts/AuthenticationContext"
import { useContext, useEffect, useState } from "react"

import { api } from "../services/api"

import '../styles/componentsStyles/UserScreen.css'

export default function UserScreen(props) {
    const { logout, tokenUser } = useContext(AuthContext)
    const [dataUsers, setDataUsers] = useState([]);

    async function fetchData() {
        const { data } = await api.get("/myProfile", {
            headers: {
                Authorization: `${tokenUser}`,
            },
        });

        setDataUsers(data)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="containerUser">
            <div className="userDisplay">
                <div className="descriptionUser">
                    <h1>Welcome {dataUsers.name}</h1>
                    <p>Your current email is <span>{dataUsers.email}</span> </p>
                </div>

                <button onClick={logout}>Logout</button>
            </div>

        </div>
    )

}
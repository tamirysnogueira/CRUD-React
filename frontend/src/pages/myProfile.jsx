import { AuthContext } from "../contexts/AuthenticationContext";
import { useContext } from "react";

import { Link } from "react-router-dom";

import '../styles/myProfile/myProfile.css'

import UserScreen from "../components/UserScreen";
import AdminScreen from "../components/AdminScreen";

export default function MyProfile() {
    const { tokenAdmin, tokenUser, emailUser } = useContext(AuthContext)

    return (
        <div>
            {emailUser === "" && (
                <div className="notPermite">
                    <span>Oops!</span>
                    <h1>Você não tem permissão para acessar essa página</h1>
                    <Link to='/login'>Back to page Login</Link>
                </div>
                
            )}

            {emailUser && (
                <>
                    {tokenUser ? (
                        <UserScreen />
                    ) : tokenAdmin ? (
                        <AdminScreen token={tokenAdmin} />
                    ) : null}
                </>
            )}
        </div>

    )
}
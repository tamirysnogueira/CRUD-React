import { api } from "../services/api"
import { AuthContext } from "../contexts/AuthenticationContext";
import { useContext, useState, useEffect } from "react";
import Modal from "./Modal";

import { ModalContext } from "../contexts/ModalContext";

import '../styles/componentsStyles/AdminScreen.css'

export default function AdminScreen() {
  const { tokenAdmin, logout } = useContext(AuthContext);
  const { modal, makeModal } = useContext(ModalContext)

  const [dataUsers, setDataUsers] = useState([]);
  const [disabledInputs, setDisabledInputs] = useState([]);

  async function fetchData() {
    const { data } = await api.get("/admin/", {
      headers: {
        Authorization: `${tokenAdmin}`,
      },
    });

    setDataUsers(data);
    setDisabledInputs(Array(data.length).fill(true));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (event, index) => {
    const updatedUsers = [...dataUsers];
    updatedUsers[index].name = event.target.value;
    setDataUsers(updatedUsers);
  }

  const handleEmailChange = (event, index) => {
    const updatedUsers = [...dataUsers];
    updatedUsers[index].email = event.target.value;
    setDataUsers(updatedUsers);
  }

  async function deleteUser(user) {
    try {
      const response = await api.delete("/admin/deleteUser", {
        headers: {
          Authorization: `${tokenAdmin}`,
          'Content-Type': 'application/json'
        },
        data: {
          email: user.email
        }
      });

      makeModal(response)

    } catch (error) {
      makeModal(error.message)
    }

    fetchData()

  }

  async function confirmUser(user, index) {
    const updatedDisabledInputs = [...disabledInputs];
    updatedDisabledInputs[index] = true;
    setDisabledInputs(updatedDisabledInputs);

    const { name, id, email } = user

    try {
      const response = await api.put("/admin/updateDataUser", {
        name,
        email,
        id
      }, {
        headers: {
          Authorization: `${tokenAdmin}`
        }
      });

      makeModal(response)

    } catch (error) {
      makeModal(error.message)
    }

    fetchData()
  }

  return (
    <div className="containerUser">
      {modal && <Modal />}

      <div className="adminDisplay">
        
        <div className="descriptionUser">
          <h1>Welcome Administrador</h1>
        </div>

        <ul>
          <h2>Users</h2>
          {dataUsers.map((user, index) => (
            <li key={user.id}>
              <div>
                <input type="email" value={user.email} disabled={disabledInputs[index]} onChange={(event) => handleEmailChange(event, index)} />
                <input type="text" value={user.name} disabled={disabledInputs[index]} onChange={(event) => handleNameChange(event, index)} />
              </div>

              <div>
                {
                  disabledInputs[index] ?
                    <button className="editButton" onClick={() => setDisabledInputs((prev) => { const updated = [...prev]; updated[index] = false; return updated; })}>Editar</button> :
                    <button className="confirmButton" onClick={() => confirmUser(user, index)}>Confirmar</button>
                }

                <button className="deleteButton" onClick={() => deleteUser(user)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>

        <button className="logout" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
import {useEffect,useState} from 'react'
import axios from 'axios'
import {BASE_URL} from "../../tools/constante.js"


const UpdateRole = (props) => {
    const [userList, setUserList] = useState([])
    const [messageErr, setMessageErr] = useState("")
    
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/users`)
            .then(function(response) {
                setUserList(response.data.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [])
    
    const handleUpdate = (id)=>{
        const updatedInfo = userList.filter(user => user.id === id )
        axios.post(`${BASE_URL}/admin/updateRole`,{
            id: updatedInfo[0].id, 
            role_id: updatedInfo[0].role_id
        })
        .then(res=>{
            if(res.statusText === "OK"){
                setMessageErr("L'informations sont bien enregistrer")
            }
        })
    }
    
    const handleChange = (id, index)=>{
        setMessageErr("")
        const newUserList = [...userList]
        newUserList[index].role_id = id
        setUserList(newUserList)
    }
    
    return (
        <div className="container-admin">
            <div className="admin-header">
                <h2>User Rôle</h2>
                <p>Utiliser Ctrl+F pour chercher nom/ prénom/ email d'utilisateur</p>
                <p>Cliquez selection pour changer le rôle</p>
                {messageErr.length > 0 && <p className="rounded py-2 px-4 bg-primary">{messageErr}</p>}
            </div>
            <table className="table-fixed w-full max-h-96">
              <thead className="border-b-2 sticky top-0 bg-gray-800 ">
                <tr className="bg-gray-700">
                  <th className="py-4 text-lg">Nom</th>
                  <th className="py-4 text-lg">Prénom</th>
                  <th className="py-4 text-lg">Email</th>
                  <th className="py-4 text-lg">Rôle</th>
                  <th className="py-4 text-lg">Modifier</th>
                </tr>
              </thead>
              <tbody className="overscroll-auto overflow-y-scroll">
              {userList.map((user, i) => {
                    return (
                        <tr key={i} className="my-2 hover:bg-gray-700">
                            <td  className="text-center">
                                <p>{user.last_name}</p>
                            </td>
                            <td  className="text-center">
                                <p>{user.first_name}</p>
                            </td>
                            <td  className="text-center">
                                <p>{user.email}</p>
                            </td>
                            <td  className="text-center">
                                <select name="role_id" 
                                    onChange={(e)=> handleChange(e.target.value, i)} 
                                    value={user.role_id}
                                    className="text-gray-700"
                                >
                                    <option value="1" >Admin</option>
                                    <option value="2">User</option>
                                </select>
                            </td>
                            <td className="flex justify-center">
                                <button 
                                    onClick={() => handleUpdate(user.id)}
                                    className="p-2 rounded bg-gray-900 hover:bg-primary"
                                >
                                    Valider
                                </button>   
                            </td>
                        </tr>
                    )
                })}
              </tbody>
            </table>
        </div>
    );
}

export default UpdateRole
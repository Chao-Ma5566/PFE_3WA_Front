import {BASE_URL} from "../tools/constante.js"
import fauxDashboard from "../assert/img/fauxDashboard.jpg"
   

const AdminHome = () => {
    
    
    return(
        <div className="admin">
            <img className="inset-0 absolute top-0 h-screen block bg-blakc object-cover m-auto" src={fauxDashboard} alt="Bubble Collection" />
        </div>
    )
}

export default AdminHome



import {Route, Routes} from "react-router-dom";
import {routesAdmin, routesUser} from '../tools/routes.js'
import AdminHome from "../components/AdminHome.jsx"
import Home from "../components/Home.jsx"
import LayerAdmin from "./AdminPage/LayerAdmin"
import LayerUser from "./LayerUser"
import PrivateRoute from "./PrivateRoute"

const Router = () => {
    return (
        <Routes>
            <Route path="/admin" element={<LayerAdmin />}>
                <Route index element={
                            <PrivateRoute auth="admin"> 
                                <AdminHome />
                            </PrivateRoute>
                        } />
                
            {/* on recupere la liste des routes et on la map */} 
            {routesAdmin.map(({ path, auth, component },i) => {
                return(
                    <Route 
                        key={i} 
                        path={path} 
                        element={
                            <PrivateRoute auth={auth}> 
                                {component}
                            </PrivateRoute>
                        } 
                        />
                )
            })}
            </Route>

            <Route path="/" element={<LayerUser />}>
                <Route index element={
                            <PrivateRoute> 
                                <Home />
                            </PrivateRoute>}/>
            {/* on recupere la liste des routes et on la map */} 
            {routesUser.map(({ path, auth, component },i) => {
                return(
                    <Route 
                        key={i} 
                        path={path} 
                        element={
                            <PrivateRoute auth={auth}> 
                                {component}
                            </PrivateRoute>
                        } 
                        />
                )
            })}
            </Route>
            
        </Routes>
    )
}

export default Router
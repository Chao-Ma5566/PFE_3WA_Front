import NavBar from "./NavBar.jsx"
import { Outlet } from "react-router-dom"
import Footer from "./Footer.jsx"

const LayerUser = () => {
    return(
        <div className="w-full min-h-screen font-satoshi">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default LayerUser
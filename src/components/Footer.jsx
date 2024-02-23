import {NavLink} from "react-router-dom"

const Footer = () => {
    return (
        <footer className="p-4 bg-neutral-50 mt-2 drop-shadow rounded-lg shadow md:flex md:items-center md:justify-between md:p-6">
            <span className="flex flex-col items-center text-sm text-gray-700 sm:text-center md:flex-row">
                © 2023 
                <NavLink href="#" className="mx-2 hover:underline">ThreeBody™</NavLink>
                . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap flex-col items-center mt-3 text-sm text-gray-700 sm:mt-0 md:flex-row">
                <li className="">
                    <NavLink to="/" className="hover:underline md:mr-6 ">About</NavLink>
                </li>
                <li className="">
                    <NavLink href="#" className="hover:underline md:mr-6">Privacy Policy</NavLink>
                </li>
                <li className="">
                    <NavLink href="#" className="hover:underline md:mr-6">Condition de Vente en Ligne</NavLink>
                </li>
                <li className="">
                    <NavLink to="/location" title="Notre Localisation" className="hover:underline">Contact</NavLink>
                </li>
            </ul>
        </footer>
    )
}

export default Footer

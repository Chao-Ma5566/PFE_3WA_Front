import { NavLink } from "react-router-dom"
import contactBg from "../assert/img/homeImg/contactBG.jpg"

const ContactHome = (props) => {
    
    return (
        <section className="w-full px-4 pb-10 px-2 lg:px-4">
            <div className="w-full h-full pt-4 md:flex md:flex-row-reverse md:justify-center lg:w-3/5 lg:m-auto">
                <img className="m-auto  md:object-contain md:max-h-96 md:flex-1" src={contactBg} alt="contact" />
                <div className="flex flex-col text-center md:flex-1 justify-center mt-4">
                    <h2 className="m-5 text-3xl md:text-4xl lg:text-3xl">Besoin de nous contacter ?</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet,  doloremque, tempora, et, consequunturipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloremque, tempora.</p>
                    <NavLink className="flex flex-col items-center mt-12" to="/location" title="Notre Localisation">
                        <p className="bg-yellow hover:bg-green-500 rounded-full py-2 px-4">Page Contact</p>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default ContactHome
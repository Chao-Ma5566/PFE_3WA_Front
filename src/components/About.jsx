import logoLetter from "../assert/img/logowhiteletters.svg"
import ecologie from "../assert/icon/userIcon/ecologie.svg"
import retour from "../assert/icon/userIcon/retour.svg"
import erconomie from "../assert/icon/userIcon/cog.svg"
import design from "../assert/icon/userIcon/design.svg"

const About = (props) => {
    
    return (
        <section className="w-full px-4 pb-10 min-h-screen bg-gradient-to-t from-green-500 to-yellow px-2 lg:px-4">
            <div className="">
                <div className="flex flex-col justify-center items-center py-2 lg:py-4">
                    <img className="w-32" src={logoLetter} alt="Logo Three Body" />
                    <h2 className=" text-2xl md:text-4xl ">
                        {("à propos de threebody").toUpperCase()}
                    </h2>
                    <p className="w-2/3 mt-4 text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloremque, tempora, et, consequuntur fugit 
                        recusandae dolorem facilis quisquam natus officia sit perferendis numquam perspiciatis possimus magni suscipit voluptatem omnis odio.
                    </p>
                </div>
                <div className="mt-20 md:mt-28">
                    <div className="min-w-2/3 h-full flex flex-wrap justify-center items-center gap-2 md:grid-cols-2 lg:grid-cols-4">
                        <div className="w-48 h-48 bg-neutral-50/20 hover:bg-neutral-50/60 shadow rounded flex flex-col justify-center gap-x-4">
                            <div className="flex justify-center">
                                <img className="w-12 inline p-2 bg-yellow rounded-full" src={ecologie} alt="écologie" />
                            </div>
                            <div className="flex flex-col text-center justify-center mt-4">
                                <p >Ecologie</p>
                                <p className="text-sm">Lorem ipsum dolor sit amet,  doloremque, tempora, et, consequuntur</p>
                            </div>
                        </div>
                        <div className="w-48 h-48 bg-neutral-50/20 hover:bg-neutral-50/60 shadow rounded flex flex-col justify-center gap-x-4">
                            <div className="flex justify-center">
                                <img className="w-12 inline p-2 bg-yellow rounded-full" src={retour} alt="Retour de client" />
                            </div>
                            <div className="flex flex-col text-center justify-center mt-4">
                                <p >Très bon retour</p>
                                <p className="text-sm">Lorem ipsum dolor sit amet,  doloremque, tempora, et, consequuntur</p>
                            </div>
                        </div>
                        <div className="w-48 h-48 bg-neutral-50/20 hover:bg-neutral-50/60 shadow rounded flex flex-col justify-center gap-x-4">
                            <div className="flex justify-center">
                                <img className="w-12 inline p-2 bg-yellow rounded-full" src={erconomie} alt="erconomie" />
                            </div>
                            <div className="flex flex-col text-center justify-center mt-4">
                                <p >Ergonomie</p>
                                <p className="text-sm">Lorem ipsum dolor sit amet,  doloremque, tempora, et, consequuntur</p>
                            </div>
                        </div>
                        <div className="w-48 h-48 bg-neutral-50/20 hover:bg-neutral-50/60 shadow rounded flex flex-col justify-center gap-x-4">
                            <div className="flex justify-center">
                                <img className="w-12 inline p-2 bg-yellow rounded-full" src={design} alt="design" />
                            </div>
                            <div className="flex flex-col text-center justify-center mt-4">
                                <p >Design</p>
                                <p className="text-sm">Lorem ipsum dolor sit amet,  doloremque, tempora, et, consequuntur</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
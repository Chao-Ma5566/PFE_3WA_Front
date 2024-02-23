import {useState, useEffect, useContext} from 'react';
import { StoreContext } from "../tools/context.js"
import bubbleChaise from "../assert/img/homeImg/bubbleHero.png"
import bubbleBg from "../assert/img/homeImg/bubbleBanner.png"
import inflatableBg from "../assert/img/homeImg/inflatableBanner.jpg"
import inflaBg from "../assert/img/homeImg/inflaHero.png"
import { NavLink } from "react-router-dom"

const Banner = (props) => {
    const [state, dispatch] = useContext(StoreContext);
    const [scrolled, setScrolled] = useState(false);
    const [dalta, setDalta] = useState(0)
    
     useEffect(() => {
        const onScroll = () => {
            window.scrollY > 300 ? setScrolled(true) : setScrolled(false);
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrolled])
    
    useEffect(() => {
         setTimeout(caroussel, 5000)
    }, [dalta])
    
    const caroussel = () =>{
        setDalta((dalta+1)%2)
    }
    
    
    return (
        <section className="w-full px-4 h-screen ">
            <div className={dalta===1?"hidden" : "block overflow-auto"}>
                <img className="z-30 inset-0 absolute top-0 h-screen block bg-blakc object-cover m-auto" src={bubbleChaise} alt="Bubble Collection" />
                <p className="z-20 absolute left-1 top-16 text-neutral-50 scale-90 text-8xl font-bold md:left-2 md:top-22 md:scale-100 lg:scale-100 lg:left-12 lg:top-22 lg:text-9xl">BUBBLE</p>
                
                <img className="inset-0 m-auto absolute top-0 h-screen object-cover" src={bubbleBg} alt="Bubble Collection" />
                {!scrolled &&
                <div className={state.menuBurgerOpen ? "hidden":""}>
                    <p className="z-40 absolute bottom-48 right-4 text-neutral-50 text-7xl md:bottom-48 md:right-36 lg:right-60 lg:bottom-48">BUBBLE</p>
                    <div className="flex flex-col items-center z-40 absolute bottom-12 right-4 lg:right-60 md:right-36 max-w-1/2 pt-4">
                        <p className="text-white w-64 text-sm font-thin inline">
                            La collection "Bubble" est la fusion parfaite entre l'art et le design moderne. qui se marie parfaitement avec n'importe quel décor. 
                        </p>
                        <NavLink to="/shop" className="inline bg-green-500 hover:bg-yellow text-md md:text-lg py-1 px-4 rounded-lg text-white mt-4" title="E-COMMERCE">
                            e-commerce
                        </NavLink>
                    </div>
                </div>  
                }
            </div>
            <div className={dalta===0?" hidden" : "block overflow-auto"}>
                <img className="z-30 inset-0 absolute top-0 h-screen block bg-blakc object-cover m-auto" src={inflatableBg} alt="inflatable Collection" />
                <img className="inset-0 m-auto absolute top-0 h-screen object-cover" src={inflaBg} alt="Bubble Collection" />
                {!scrolled &&
                <div className={state.menuBurgerOpen ? "hidden":""}>
                    <p className="z-40 absolute bottom-48 right-4 text-neutral-50 text-6xl md:bottom-48 md:right-36 lg:right-60 lg:bottom-48">
                        INFLATABLE
                    </p>
                    <div className="flex flex-col items-center z-40 absolute bottom-12 right-4 lg:right-60 md:right-36 max-w-1/2 pt-4">
                        <p className="text-white w-64 text-sm font-thin inline">
                            La collection "Inflatable" est une collection de meubles modernes, élégants et très pratiques. Installation rapide et déplacement facile. 
                        </p>
                        <NavLink to="/shop" className="inline bg-green-500 hover:bg-yellow text-md md:text-lg py-1 px-4 rounded-lg text-light text-white mt-4" title="E-COMMERCE">
                            e-commerce
                        </NavLink>
                    </div>
                </div>
                }
            </div>
        </section>
    )
}

export default Banner
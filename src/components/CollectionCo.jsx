import TrackVisibility from 'react-on-screen'
import co_collection1 from "../assert/img/co-collection1.jpg"
import { useEffect, useState } from "react";

const CollectionCo = (props) => {
    const [textNum, setTextNum] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const toRotate = [ "Gammy Bear", "Jeff Koons", "LEGO", "Co-Collection",""] 
    const [text, setText] = useState("")
    const [delta,setDelta]=useState(400-Math.random() * 30)
    const period = 500;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick()
        }, delta)

        return () => { clearInterval(ticker)}
    }, [text])

    const tick = () => {
        let i = textNum;
        let fullText = toRotate[i]
        let updateText = isDeleting ? fullText.substring(0, text.length -1) : fullText.substring(0, text.length + 1)

        setText(updateText)

        if(isDeleting) {
            setDelta(prevDelta => prevDelta /2)
        }

        if(!isDeleting && updateText === fullText && textNum !== toRotate.length - 1) {
            setIsDeleting(true)
            setDelta(period)
        }else if(isDeleting && updateText === "") {
            setIsDeleting(false)
            setTextNum((textNum+1)%4)
            setDelta(10 * toRotate[textNum].length)
        }
    }
    
    return (
        <div id="co-collection" >
            <div className="co_banner collection_contrainer">
                <TrackVisibility>
                    {({ isVisible }) => (
                    <div>
                        <h2>Three Body</h2>
                        <h2>X</h2>
                        <h2 className="co_title">{text}|</h2>
                    </div>
                    )}
                </TrackVisibility>
            </div>
            <article className="collection_desription">
                <img className="collection_product_img_right" src={co_collection1} alt="Gammy Bear Chair" />
                <p>
                  La collection de coopération est la collection parfaite pour ceux qui cherchent à ajouter une touche ludique et créative à leur intérieur. Cette collection est inspirée de formes emblématiques de la culture populaire, telles que les personnages de Lego, les bonbons, les cubes Rubik et bien d'autres encore.
                 </p> 
                <p>
                    Chaque pièce de cette collection est fabriquée avec des matériaux de qualité supérieure, ce qui garantit une durabilité et une résistance accrues. Les formes uniques de chaque pièce créent une ambiance ludique et créative dans votre espace de vie, tout en ajoutant une touche de nostalgie et de réconfort.
                </p>
                <p>
                    Les formes des pièces de cette collection sont uniques et créatives, ce qui les rend idéales pour les enfants et les adultes qui cherchent à ajouter une touche de fantaisie à leur intérieur. Les couleurs vives et les formes ludiques sont parfaites pour stimuler la créativité et l'imagination, et pour créer un espace de vie dynamique et inspirant.
                </p>
                <p>
                    La collection de coopération est disponible dans une variété de formes et de tailles, ce qui vous permet de personnaliser votre espace de vie en fonction de vos goûts et de vos préférences. Vous pouvez choisir parmi une gamme de personnages de Lego, de bonbons, de cubes Rubik et bien d'autres encore, pour créer une ambiance unique et créative dans votre espace de vie.
                </p>
                <p>
                    En somme, la collection de coopération est l'option idéale pour ceux qui cherchent à ajouter une touche ludique et créative à leur intérieur. Avec leurs formes uniques, leurs couleurs vives et leur durabilité accrue, ces pièces sont parfaites pour les enfants et les adultes qui cherchent à ajouter une touche de fantaisie à leur espace de vie. Commandez dès maintenant votre pièce de la collection de coopération et découvrez comment elle peut transformer votre espace en un lieu créatif et inspirant.
                </p>
             </article>
        </div>
    )
}

export default CollectionCo
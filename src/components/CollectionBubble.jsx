import bubble1 from "../assert/img/bubble1.jpg"

const CollectionBubble = (props) => {
    
    return (
        <div id="bubble" >
            <div className="bubble_banner collection_contrainer">   
                <div>
                </div>
            </div>
            <div>
                <h2 className="bubble_title">BUBBLE</h2>
                <h3 className="bubble_front">BUBBLE</h3>
            </div>
            <article className="collection_desription">
                <img className="collection_product_img_left" src={bubble1} alt="Bubble Collection Chair" />
                <p>
                    La collection "Bubble" est la fusion parfaite entre l'art et le design moderne. Ces chaises transparentes sont non seulement élégantes et élancées, mais elles ont également été conçues avec soin pour répondre aux besoins de ceux qui cherchent des meubles confortables et tendance.
                </p>
                <p>
                    Leur forme ronde donne l'impression d'être enveloppé dans une bulle de confort, tandis que leur transparence offre une esthétique moderne qui se marie parfaitement avec n'importe quel décor. Chaque chaise est légère et facile à déplacer, vous permettant ainsi de changer la configuration de votre espace à tout moment.
                </p>
                <p>
                    Mais la collection "Bubble" ne se contente pas d'être belle et pratique, elle est également très fonctionnelle. Leur design futuriste comprend des détails intelligents tels que des dossiers ergonomiques et des assises rembourrées pour vous offrir un confort maximal tout en ajoutant une touche d'élégance à votre intérieur.
                </p>
                <p>
                    Ces chaises sont idéales pour ceux qui cherchent à ajouter une touche de modernité à leur maison ou leur espace de travail, sans sacrifier le confort. Elles sont également parfaites pour les événements spéciaux, car leur transparence et leur légèreté permettent de les déplacer facilement et de les intégrer dans tout type de décor.
                </p>
                <p>
                    En somme, la collection "Bubble" est l'incarnation de la modernité, du confort et de la fonctionnalité. Elle est l'option idéale pour ceux qui cherchent à créer un intérieur élégant et confortable sans sacrifier leur budget ou leur goût pour le design contemporain. Commandez dès maintenant votre chaise "Bubble" et découvrez comment cette collection peut transformer votre espace en un lieu moderne et pratique.
                </p>
             </article>
        </div>
    )
}

export default CollectionBubble
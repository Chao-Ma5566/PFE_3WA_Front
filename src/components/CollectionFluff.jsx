import TrackVisibility from 'react-on-screen'
import fluff1 from "../assert/img/fluff1.jpg"

const CollectionFluff = (props) => {
    
    return (
        <div id="fluff" >
            <div className="fluff_banner collection_contrainer">   
                <div>
                    <TrackVisibility>
                        {({ isVisible }) => (<div className="fluff_title_contrainer"><h2 className="fluff_title">FLUFF</h2></div>) }
                    </TrackVisibility>  
                </div>
            </div>
            <article className="collection_desription">
                <img className="collection_product_img_left" src={fluff1} alt="Fluff Collection Chair" />
                <p>
                    La collection "Fluff" est la collection parfaite pour ceux qui cherchent à ajouter une touche de confort et de douceur à leur intérieur. Ces fauteuils sont conçus pour vous offrir une expérience de détente ultime, grâce à leur design luxueux et leur rembourrage moelleux.
                 </p> 
                <p>
                    Les fauteuils de la collection "Fluff" sont le choix parfait pour une soirée cinéma, une lecture ou simplement pour se détendre après une longue journée. Leur design confortable et douillet est parfait pour s'y blottir, tandis que leur silhouette élégante et moderne se marie parfaitement avec tout type de décor.
                </p>
                <p>
                    Chaque fauteuil de la collection "Fluff" est fabriqué avec des matériaux de qualité supérieure, afin de vous garantir une expérience de détente durable. Leur rembourrage moelleux est recouvert d'un tissu doux et confortable qui ajoute une touche de luxe à votre intérieur.
                </p>
                <p>
                    Disponibles dans une variété de couleurs, ces fauteuils vous permettent de personnaliser votre espace de vie et de créer une ambiance chaleureuse et invitante. Leur design élégant et moderne est parfait pour les intérieurs contemporains, tandis que leur rembourrage douillet et leur confort sont idéaux pour les espaces plus traditionnels.
                </p>
                <p>
                    En somme, la collection "Fluff" est l'option parfaite pour ceux qui cherchent à ajouter une touche de confort et de douceur à leur intérieur. Avec leur design luxueux, leur rembourrage moelleux et leur silhouette élégante, ces fauteuils sont un choix parfait pour une soirée de détente ou une soirée cinéma. Commandez dès maintenant votre fauteuil "Fluff" et découvrez comment cette collection peut transformer votre espace en un havre de paix et de confort.
                </p>
             </article>
        </div>
    )
}

export default CollectionFluff
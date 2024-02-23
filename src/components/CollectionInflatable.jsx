import TrackVisibility from 'react-on-screen'
import inflatable1 from "../assert/img/inflatable1.jpg"

const CollectionInflatable = (props) => {
    
    return (
        <div id="inflatable" >
            <div className="inflatable_banner collection_contrainer">   
                <div>
                    <TrackVisibility>
                        {({ isVisible }) => (<h2 className={isVisible?"inflatable_title":""}>INFLATABLE</h2>) }
                    </TrackVisibility>  
                </div>
            </div>
            <article className="collection_desription">
                <img className="collection_product_img_right" src={inflatable1} alt="Inflatable1 Collection Chair" />
                <p>
                  La collection "Inflatable" est une collection de meubles modernes, élégants et très pratiques. Ces fauteuils et chaises ont été conçus pour être facilement gonflables, ce qui les rend idéaux pour une utilisation en extérieur ou pour des événements spéciaux. 
                </p> 
                <p>
                    Chaque meuble de la collection "Inflatable" est fabriqué avec des matériaux durables et résistants, ce qui leur permet de résister aux éléments et à une utilisation fréquente. Ils sont également très faciles à transporter et à ranger, car ils peuvent être dégonflés en quelques secondes pour être rangés dans un sac de transport pratique.
                </p>
                <p>
                    Leur design moderne et élégant les rend idéaux pour une utilisation en extérieur, que ce soit pour des barbecues, des soirées sur la plage ou pour se détendre au bord de la piscine. Ils sont également très pratiques pour les événements spéciaux, car leur légèreté et leur facilité d'utilisation permettent de les installer rapidement et de les déplacer facilement. 
                </p>
                <p>
                    Ces chaises sont idéales pour ceux qui cherchent à ajouter une touche de modernité à leur maison ou leur espace de travail, sans sacrifier le confort. Elles sont également parfaites pour les événements spéciaux, car leur transparence et leur légèreté permettent de les déplacer facilement et de les intégrer dans tout type de décor.
                </p>
                <p>
                    La collection "Inflatable" est disponible dans une variété de couleurs et de tailles, ce qui vous permet de personnaliser votre espace de vie et de créer l'ambiance que vous souhaitez. Ils sont également très confortables, avec un design ergonomique qui épouse les contours de votre corps pour vous offrir un confort optimal.
                </p>
             </article>
        </div>
    )
}

export default CollectionInflatable
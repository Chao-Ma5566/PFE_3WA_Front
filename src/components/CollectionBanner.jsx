import {useState, useEffect} from 'react';
import logo from "../assert/img/logoletterwhite.svg"

const CollectionBanner = (props) => {
    const [enShow, setEnShow] = useState("bubble")
    
    const changeEnshow = (collectionName) => {
        setEnShow(collectionName)
    }
    
    return (
        <div className={`collection_contrainer banner_${enShow}`}>
            <h1>- Nos Collections -</h1>
            <div className="collection_carousel">
                <div className={`big_image ${enShow}`}>
                    <img className="logo_collection" src={logo} alt="Logo Three Body" />
                    <a href={`#${enShow}`} className="collection_button">En Savoir Plus Sur {enShow.toUpperCase()}</a>
                </div>
                <div className="collection_choice">
                    <div className={enShow==="bubble"&&"selected"} onClick={()=>changeEnshow("bubble")}>
                        BUBBLE
                    </div>
                    <div  className={enShow === "inflatable"&&"selected"} onClick={()=>changeEnshow("inflatable")}>
                        INFLATABLE
                    </div>
                    <div  className={enShow === "fluff"&&"selected"} onClick={()=>changeEnshow("fluff")}>
                        FLUFF
                    </div>
                    <div  className={enShow === "co-collection"&&"selected"} onClick={()=>changeEnshow("co-collection")}>
                        CO-COLLECTION
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionBanner
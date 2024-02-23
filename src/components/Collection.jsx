import CollectionBanner from './CollectionBanner'
import CollectionBubble from './CollectionBubble'
import CollectionInflatable from "./CollectionInflatable"
import CollectionFluff from "./CollectionFluff"
import CollectionCo from "./CollectionCo"

const Collection = (props) => {

  
    return (
        <section className="collection">
            <CollectionBanner />
            <CollectionBubble />
            <CollectionInflatable />
            <CollectionFluff />
            <CollectionCo />
        </section>
    )
}

export default Collection

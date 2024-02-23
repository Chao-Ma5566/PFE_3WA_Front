import AddArticle from "../components/AdminPage/AddArticle.jsx"
import ArticleList from "../components/AdminPage/ArticleList.jsx"
import Article from "../components/Article.jsx"
import Error404 from "../components/Error404.jsx"
import Login from "../components/Login.jsx"
import Logout from "../components/Logout.jsx"
import Shop from "../components/Shop.jsx"
import Articles from "../components/Articles.jsx"
import Cart from "../components/Cart.jsx"
import Location from "../components/Location.jsx"
import Profil from "../components/Profil.jsx"
import Product from "../components/Product.jsx"
import Register from "../components/Register.jsx"
import Collection from "../components/Collection.jsx"
import UpdateArticle from "../components/AdminPage/UpdateArticle.jsx"
import UpdateArticlePhoto from "../components/AdminPage/UpdateArticlePhoto.jsx"
import UpdatePassword from "../components/UpdatePassword.jsx"
import UpdateProfil from "../components/UpdateProfil.jsx"
import UpdateRole from "../components/AdminPage/UpdateRole.jsx"
import UserList from "../components/AdminPage/UserList.jsx"
import AddProduct from "../components/AdminPage/AddProduct.jsx"
import AddCollection from "../components/AdminPage/AddCollection.jsx"
import CollectionList from "../components/AdminPage/CollectionList.jsx"
import UpdateCollection from "../components/AdminPage/UpdateCollection.jsx"
import ProductsList from "../components/AdminPage/ProductsList.jsx"
import UpdateProduct from "../components/AdminPage/UpdateProduct.jsx"
import UpdateProductPhoto from "../components/AdminPage/UpdateProductPhoto.jsx"
import CommandesList from "../components/AdminPage/CommandesList.jsx"
import PromosList from "../components/AdminPage/PromosList.jsx"



const routesUser = [
    {path:"login", component:<Login />},
    {path:"register", component:<Register />},
    {path:"location", component:<Location />},
    {path:"articles", component:<Articles />},
    {path:"collection", component:<Collection />},
    {path:"profil/:userId", component:<Profil />, auth:"user"},
    {path:"updateProfil/:userId", component:<UpdateProfil />, auth:"user"},
    {path:"updatePassword/:userId", component:<UpdatePassword />, auth:"user"},
    {path:"logout", component:<Logout />, auth:"user"},
    {path:"cart", component:<Cart />},
    {path:"article/:articleId", component:<Article />},
    {path:"product/:productId", component:<Product />},
    {path:"shop", component:<Shop />},
    {path:"*", component:<Error404 />}
]

const routesAdmin = [
    {path:"/admin/users", component:<UserList />, auth:"admin"},
    {path:"/admin/roles", component:<UpdateRole />, auth:"admin"},
    {path:"/admin/articles", component:<ArticleList />, auth:"admin"},
    {path:"/admin/collection", component:<CollectionList />, auth:"admin"},
    {path:"/admin/produits", component:<ProductsList />, auth:"admin"},
    {path:"/admin/addArticle", component:<AddArticle />, auth:"admin"},
    {path:"/admin/addCollection", component:<AddCollection />, auth:"admin"},
    {path:"/admin/addProduct", component:<AddProduct />, auth:"admin"},
    {path:"/admin/updateArticle/:articleId", component:<UpdateArticle />, auth:"admin"},
    {path:"/admin/updateArticlePhoto/:articleId", component:<UpdateArticlePhoto />, auth:"admin"},
    {path:"/admin/updateCollection/:collectionId", component:<UpdateCollection />, auth:"admin"},
    {path:"/admin/updateProduct/:productId", component:<UpdateProduct />, auth:"admin"},
    {path:"/admin/updateProductPhoto/:productId", component:<UpdateProductPhoto />, auth:"admin"},
    {path:"/admin/commandes", component:<CommandesList />, auth:"admin"},
    {path:"/admin/promos", component:<PromosList />, auth:"admin"},
    
]



export {routesUser, routesAdmin} 
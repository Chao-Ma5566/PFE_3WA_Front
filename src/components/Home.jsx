import React from 'react';
import Banner from "./Banner"
import About from "./About"
import ContactHome from "./ContactHome"

const Home = (props) => {
    
    return (
        <main className="w-full">
            <Banner />
            <About />
            <ContactHome />
        </main>
    )
}

export default Home
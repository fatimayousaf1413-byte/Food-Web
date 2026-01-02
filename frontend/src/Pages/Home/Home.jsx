import React, { useState } from 'react'
import './Home.css'
import Exploremenu from '../../Components/Exploremenu/Exploremenu'
import Fooddisplay from '../../Components/Fooddisplay/Fooddisplay'
import Appdownload from '../../Components/Appdownload/Appdownload'
import Body from '../../Components/Body/Body'

const Home = () => {
    const [catagory, setcatagory] = useState("All")

    return (
        <div>
            <Body />
            <Exploremenu catagory={catagory} setcatagory={setcatagory} />
            <Fooddisplay catagory={catagory} />
            <Appdownload />
        </div>
    )
}

export default Home;
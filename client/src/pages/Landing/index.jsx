import job_hunt from "../../assets/images/job_hunt.svg"
import { Wrapper } from "../../assets/wrappers/LandingPage.js"
import {Logo} from "../../components"
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className="container page">
            <div className="info">
                <h1>
                    Job <strong> Finding App </strong>
                </h1>
                <p> I'm baby af live-edge bodega boys pop-up deep v heirloom vegan. Pug JOMO messenger bag iceland, cronut poutine heirloom DSA man bun snackwave kogi occupy chillwave polaroid tbh. Mlkshk hexagon blog bitters meh. Leggings quinoa godard tonx hexagon. Narwhal etsy intelligentsia artisan drinking vinegar paleo. </p>
                <Link to="/register">
                    <button className="btn btn-hero"> Login/Register </button>
                </Link>
            </div>
            <img src={job_hunt} className="main-img" alt="main-img" />
        </div>
    </Wrapper>
  )
}

export default Landing
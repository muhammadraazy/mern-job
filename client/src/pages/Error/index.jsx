import { Link } from "react-router-dom"
import notFound from "../../assets/images/not-found.svg"
import Wrapper from "../../assets/wrappers/ErrorPage"

const NotFound = () => {
  return (
   <Wrapper>
      <div>
          <img src={notFound} alt="page not found" />
          <h2> Oops, Page Not Found </h2>
          <p> we can't seem to find the page you looking for </p>
          <Link to="/"> Back Home </Link>
      </div>
   </Wrapper>
  )
}

export default NotFound
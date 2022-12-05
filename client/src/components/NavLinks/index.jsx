import { links } from "../../utils/links"
import { NavLink } from "react-router-dom"

const Navlinks = ({toggleSidebar}) => {

  return (
    <div className="nav-links">
            { links?.map(link => (
                <NavLink 
                    key={link.id} 
                    to={link.path} 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
                     onClick={toggleSidebar}
                    >
                        <span className="icon">  { link.icon }  </span>
                           { link.text }
                </NavLink>
         )) }
    </div>
  )
}

export default Navlinks
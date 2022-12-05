import { IoBarChartSharp } from "react-icons/io5"
import { MdQueryStats } from "react-icons/md"
import { FaWpforms } from "react-icons/fa"
import { ImProfile } from "react-icons/im"

export const links = [
    { id: 1, path: "/", text: "Stats", icon: <IoBarChartSharp />},
    { id: 2, path: "/add-job", text: "Add Job", icon: <FaWpforms />},
    { id: 3, path: "/all-jobs", text: "Get All Jobs", icon: <MdQueryStats />},
    { id: 4, path: "/profile", text: "Profile", icon: <ImProfile /> }
]

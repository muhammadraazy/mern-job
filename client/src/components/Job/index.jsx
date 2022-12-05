import moment from "moment"
import { Link } from "react-router-dom"
import {FaCalendarAlt, FaLocationArrow, FaBriefcase} from "react-icons/fa"
import Wrapper from "../../assets/wrappers/Job"
import { useAppContext } from "../../context/appContext"
import JobInfo from "../JobInfo"

const Job = ({ company, createdAt, position, jobLocation, jobType, _id, status }) => {
  const { setEditJob, deleteJob } = useAppContext()
    let date = moment(createdAt)
    date = date.format("MMM Do YY")

  return (
   <Wrapper>
        <header>
           <div className="main-icon"> { company?.charAt(0) } </div>
           <div className="info">
              <h5> { position } </h5>
              <h5> { company } </h5>
           </div>
        </header>
        <div className="content">
           <div className="content-center">
               <JobInfo icon={ <FaLocationArrow /> } text={jobLocation} />
               <JobInfo icon={ <FaCalendarAlt /> } text={date} />
               <JobInfo icon={ <FaBriefcase /> } text={jobType} />
               <div className={`status ${status}`}> { status } </div>
           </div>
            <footer className="footer">
                <div className="actions">
                    <Link to="/add-job" className="btn edit-btn" onClick={() => setEditJob(_id)}> Edit </Link>
                    <button type="button" className="btn delete-btn" onClick={() => deleteJob(_id)}> Delete </button>
                </div>
            </footer>
        </div>
   </Wrapper>
  )
}

export default Job
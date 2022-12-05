import { useEffect } from 'react'
import Loading from '../Loading'
import Job from '../Job'
import Wrapper from "../../assets/wrappers/JobsContainer"
import { useAppContext } from '../../context/appContext'
import PageBtnContainer from "../PageBtnContainer"

const JobsContainer = () => {
     const { isLoading, page, numOfPages, totalJobs, jobs, getJobs, search, searchStatus, searchType, sort } = useAppContext()

     useEffect(() => {
        getJobs()
         //  eslint-disable-next-line
     }, [page, search, searchStatus, searchType, sort])

     if(isLoading) {
        return <Loading />
     }

     if(jobs?.length === 0) {
         return (
            <Wrapper>
                <h2> No jobs to display .. </h2>
            </Wrapper>
         )
     }

  return (
    <Wrapper>
        <h5> { totalJobs } job{ jobs?.length > 1 && 's' } Found </h5>
        <div className="jobs">
            { jobs?.map(job => (
                <Job key={job._id}  {...job}  />
            )) }
            {numOfPages > 1 && <PageBtnContainer /> }
        </div>
    </Wrapper>
  )
}

export default JobsContainer
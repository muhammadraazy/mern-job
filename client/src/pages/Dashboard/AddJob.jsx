import { FormRow, Alert, FormRowSelect } from "../../components"
import { useAppContext } from "../../context/appContext.js"
import Wrapper from "../../assets/wrappers/DashboardFormPage"


const AddJob = () => {
   const { 
    isEditing, isLoading, showAlert, 
    displayAlert, position, 
    company, jobType, 
    jobTypeOptions, jobLocation, 
    status, statusOptions, handleChanges, 
    clearValues, createJob, editJob } = useAppContext()

   const handleJobInput = (e) => {
     const value = e.target.value;
     const name = e.target.name

     handleChanges({name, value})
   }

   const handleSubmit = (e) => {
     e.preventDefault()

     if(!position || !company || !jobLocation) { 
       displayAlert()
       
       return;
      }

      if(isEditing) {
          editJob()
          return;
      }

      createJob()
   }

  return (
    <Wrapper>
       <form className="form" onSubmit={handleSubmit} >
            <h3> { isEditing ? "edit job" : "add job" } </h3>
            { showAlert && <Alert /> }
            <div className="form-center">
                <FormRow
                    labelText="Position"
                    name="position"
                    value={position}
                    handleChange={handleJobInput}
                 />
                <FormRow
                    labelText="Job Location"
                    name="jobLocation"
                    value={jobLocation}
                    handleChange={handleJobInput}
                 />
                <FormRow
                    labelText="Company"
                    name="company"
                    value={company}
                    handleChange={handleJobInput}
                 />
                
                <FormRowSelect 
                  name="jobType" 
                  handleChange={handleJobInput} 
                  labelText="Job Type" 
                  value={jobType}
                  lists={jobTypeOptions} 
                  /> 

                <FormRowSelect 
                  name="status" 
                  handleChange={handleJobInput} 
                  labelText="Status" 
                  value={status}
                  lists={statusOptions} 
                  /> 

                 <div className="btn-container">
                     <button className="btn btn-block submit-btn" type="submit" disabled={isLoading}>
                         Submit
                     </button>
                     <button 
                          className="btn btn-block clear-btn" onClick={(e) => {
                          e.preventDefault()
                          clearValues()
                          }}>
                            Clear 
                      </button>
                 </div>
            </div>
       </form>
    </Wrapper>
  )
}

export default AddJob
import {FormRow, FormRowSelect } from "../../components"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/SearchContainer"

const SearchContainer = () => {
    const { isLoading, search, searchStatus, searchType, sort, sortOptions, handleChanges, clearFilters, jobTypeOptions, statusOptions } = useAppContext()

    const handleSearch = (e) => {
        if(isLoading) return;

        handleChanges({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = (e) => {
         e.preventDefault()

         clearFilters()
    }

  return (
    <Wrapper>
        <form className="form">
           <h4> Search Form </h4>
           <div className="form-center">
              <FormRow type='text' name="Search" value={search} handleChange={handleSearch} />
               <FormRowSelect
                 labelText='By status'
                 name='searchStatus'
                 value={searchStatus}
                 handleChange={handleSearch}
                 lists={['all', ...statusOptions]}
              />
             <FormRowSelect
                labelText='By Type'
                name='searchType'
                value={searchType}
                handleChange={handleSearch}
                lists={['all', ...jobTypeOptions]}
              />
             <FormRowSelect
                name='sort'
                value={sort}
                handleChange={handleSearch}
                lists={sortOptions}
               /> 
               <button
                  className='btn btn-block btn-danger'
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  clear filters
              </button>
           </div>
        </form>
    </Wrapper>
  )
}

export default SearchContainer
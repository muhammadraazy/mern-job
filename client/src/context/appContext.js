import { useReducer, useContext, createContext } from "react";
import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOB_BEGIN,
    GET_JOB_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE
} from "./action";
import { reducer } from "./reducer";
import axios from "axios"

import { apiUrl } from "./api"


const AppContext = createContext()

const AppProvider = ({children, initialState}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

 const authFetch = axios.create({
        baseURL: "http://localhost:5000/api/v1",
        headers: {
                Authorization: `Bearer ${state?.token}`
          }
    })
    
    authFetch.interceptors.response.use(function (response) {
      return response;
    }, (error) => {
       if(error.response.statusText === "Unauthorized") {
           setTimeout(() => logoutUser() ,2000)
       }
      return Promise.reject(error);
    });

      const displayAlert = () => {
          dispatch({ type: DISPLAY_ALERT })
      }

      const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT})
        }, 3000)
      }

      const addUserToLocalStorage = ({ user, token, location }) => {
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          localStorage.setItem("location", location)
      }

      const removeUserFromLocalStorage = () => {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          localStorage.removeItem("location")
      }

      
      const setupUser = async(currentUser, endpoint, alertText) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const response = await axios.post(`${apiUrl}/auth/${endpoint}`, currentUser)
            const { user, token, location } = response.data

            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText } })
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({ type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg} })
        }

        clearAlert()
      }

      const toggleSidebar = () => {
         dispatch({ type: TOGGLE_SIDEBAR })
      }

      const logoutUser = () => {
          dispatch({ type: LOGOUT_USER })
          removeUserFromLocalStorage()
      }

      const updateUser = async(currentUser) => {
            dispatch({ type: UPDATE_USER_BEGIN})
        try {
            const { data } = await authFetch.put("/auth/updateUser", currentUser)
            const { user, token, location } = data;
            
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, location } })
        } catch (error) {
            dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg }})
        }

        clearAlert()
      }

      const handleChanges = ({name, value}) => {
         dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
      }

      const clearValues = () => {
         dispatch({ type: CLEAR_VALUES })
      }


      const createJob = async() => {
            dispatch({ type: CREATE_JOB_BEGIN })

            try {
                const { position, company, jobLocation, jobType, status } = state;
                await authFetch.post('/jobs', {  position, company, jobLocation, jobType, status })

                 dispatch({ type: CREATE_JOB_SUCCESS })
                dispatch({ type: CLEAR_VALUES })
            } catch (error) {
                dispatch({ type: CREATE_JOB_ERROR, payload: { msg: error.response.data.msg }})
            }

            clearAlert()
      }

      const getJobs = async() => {
           dispatch({ type: GET_JOB_BEGIN })
           const { page, search, searchStatus, searchType, sort } = state;
           let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`

           if(search) {
               url = `${url}&search=${search}`
           }

           try {
                const { data } = await authFetch.get(url)
                const { jobs, totalJobs, numOfPages } = data;

                dispatch({ type: GET_JOB_SUCCESS, payload: { jobs, totalJobs, numOfPages } })
           } catch (error) {
                logoutUser()
           }
      }

      const setEditJob = (id) => {
         dispatch({ type: SET_EDIT_JOB, payload: { id } })
      }

      const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN})

        try {
            const { position, company, jobLocation, jobType, status} = state;
            await authFetch.put(`/jobs/${state.editJobId}`, { position, company, jobLocation, jobType, status })

            dispatch({ type: EDIT_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg }})
        }
      }

      const deleteJob = async(jobId) => {
         dispatch({ type: DELETE_JOB_BEGIN });

         try {
           await authFetch.delete(`/jobs/${jobId}`)   
            
            getJobs()
         } catch (error) {
             logoutUser()
         }
      }

      const showStats = async() => {
          dispatch({ type: SHOW_STATS_BEGIN})

          try {
                const { data } = await authFetch.get("/jobs/stats")
                dispatch({ type: SHOW_STATS_SUCCESS, payload: { stats: data.defaultStats, monthlyApplications: data.monthlyApplications }})
          } catch (error) {
               logoutUser()
          }
      }

      const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
      }

      const changePage = async page => {
         dispatch({ type: CHANGE_PAGE, payload: { page } })
      }

    return (
        <AppContext.Provider 
                value={{
                    ...state, 
                     displayAlert, 
                     clearAlert, 
                     setupUser, 
                     toggleSidebar, 
                     logoutUser, 
                     updateUser,  
                     handleChanges,
                     clearValues,
                     createJob,
                     getJobs,
                     setEditJob,
                     deleteJob,
                     editJob,
                     showStats,
                     clearFilters,
                     changePage
                     }}>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
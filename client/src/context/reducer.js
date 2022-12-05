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
} from "./action"

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
const userLocation = localStorage.getItem("location")

export const initialState = {
   isLoading: false,
   showAlert: false,
   alertText: '',
   alertType: '',
   user: user ? JSON.parse(user) : null,
   token: token,
   userLocation: userLocation || '' ,
   showSidebar: false,
   jobLocation: userLocation || '' ,
   isEditing: false,
   editJobId: '',
   position: '',
   company: '',
   jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
   jobType: "full-time",
   statusOptions: ['interview', 'pending', 'declined'],
   status: 'pending',
   jobs: [],
   totalJobs: 0,
   numOfPages: 1,
   page: 1,
   stats: {},
   monthlyApplications: [],
   search: '',
   searchStatus: 'all',
   searchType: 'all',
   sort: 'latest',
   sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}


export const reducer = (state, action) => {

     switch(action.type) {
        case DISPLAY_ALERT: 
            return { ...state, showAlert: true, alertType: 'danger', alertText: "please provide all values" }
        case CLEAR_ALERT:
            return { ...state, showAlert: false, alertType: '', alertText: ''}
        case SETUP_USER_BEGIN:
            return { ...state, isLoading: true }
        case SETUP_USER_SUCCESS:
            return { 
                ...state, 
                isLoading: false, 
                user: action.payload.user, 
                token: action.payload.token, 
                userLocation: action.payload.location, 
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText
            }
        case SETUP_USER_ERROR:
            return { 
                ...state, 
                isLoading: false,
                showAlert: true, 
                alertType: 'danger', 
                alertText: action.payload.msg 
            }
        case TOGGLE_SIDEBAR:
            return { ...state, showSidebar: !state.showSidebar }
        case LOGOUT_USER:
            return { ...state, user: null, token: null, userLocation: null, jobLocation: null }
        case UPDATE_USER_BEGIN: 
            return { ...state, isLoading: true }
        case UPDATE_USER_SUCCESS:
             return {
                ...state, 
                isLoading: false, 
                user: action.payload.user, 
                token: action.payload.token, 
                userLocation: action.payload.location, 
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: "User updated!"
             }
        case UPDATE_USER_ERROR:
            return { 
                ...state, 
                isLoading: false,
                showAlert: true, 
                alertType: 'danger', 
                alertText: action.payload.msg
            }
        case HANDLE_CHANGE:
            return { 
                ...state,
                page: 1,
                [action.payload.name]: action.payload.value
            }
        case CLEAR_VALUES:
             let initialState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: "full-time",
                status: 'pending'
             }

            return { 
                ...state,
                ...initialState
            }
            case CREATE_JOB_BEGIN: 
            return { ...state, isLoading: true }
        case CREATE_JOB_SUCCESS:
             return {
                ...state, 
                isLoading: false, 
                showAlert: true,
                alertType: 'success',
                alertText: "Job Created!"
             }
        case CREATE_JOB_ERROR:
            return { 
                ...state, 
                isLoading: false,
                showAlert: true, 
                alertType: 'danger', 
                alertText: action.payload.msg
            }
        case GET_JOB_BEGIN:
             return {
                ...state, 
                isLoading: true, 
                showAlert: false,
             }
        case GET_JOB_SUCCESS:
            return { 
                ...state, 
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages
            }
        case SET_EDIT_JOB:
             const editedJob = state.jobs.find(job => job._id === action.payload.id)
             const { _id, position, company, jobLocation, status, jobType } = editedJob;

            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position, company, jobLocation, status, jobType
            }
        case DELETE_JOB_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_JOB_BEGIN: 
            return { ...state, isLoading: true }
        case EDIT_JOB_SUCCESS:
             return {
                ...state, 
                isLoading: false, 
                showAlert: true,
                alertType: 'success',
                alertText: "Saves Changes!"
             }
        case EDIT_JOB_ERROR:
            return { 
                ...state, 
                isLoading: false,
                showAlert: true, 
                alertType: 'danger', 
                alertText: action.payload.msg
            }
        case SHOW_STATS_BEGIN: 
                return { ...state, isLoading: true, showAlert: false }
        case SHOW_STATS_SUCCESS:
                 return {
                    ...state, 
                    isLoading: false, 
                    stats: action.payload.stats,
                    monthlyApplications: action.payload.monthlyApplications
                 }
        case CLEAR_FILTERS:
            return {
                ...state, 
                  search: '',
                  searchStatus: 'all',
                  searchType: 'all',
                  sort: 'latest'    
                }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
        default:
            throw new Error(`no such action: ${action.type}`)
     }
}

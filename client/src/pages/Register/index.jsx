import {useState, useEffect } from "react"
import Wrapper from "../../assets/wrappers/RegisterPage"
import { Alert, FormRow, Logo } from "../../components"
import { useAppContext } from "../../context/appContext"
import { useNavigate } from "react-router-dom"

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: false,
}

const Register = () => {
     const [values, setValues] = useState(initialState)
     const { user, isLoading, showAlert, displayAlert, clearAlert, setupUser } = useAppContext()
     const navigate = useNavigate()

     useEffect(() => {
        if(user) {
            setTimeout(() => {
                navigate("/")
            }, 3000)    
        }
     }, [user, navigate])

      useEffect(() => {
         clearAlert()
      }, [clearAlert])

     const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
     }

     const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
     }

     const submit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember} = values;

        if(!email || !password || (!isMember && !name)) {
            displayAlert()

            return
        }

        const currentUser = {name, email, password}
        if(isMember) {
            setupUser(currentUser, 'login', 'User loggedin, redirecting ..')
        }  else {
            setupUser(currentUser, 'register', 'User registered')
        }
        setValues({ ...values, name: '', email: '', password: '' })
     }  

  return (
    <Wrapper>
        <form className="form" onSubmit={submit}>
            <Logo />
            <h3> { values.isMember ? "Login" : "Register" } </h3>
            { showAlert && <Alert/> }
                { !values.isMember && (
                    <FormRow   
                        type="text" name="name" 
                        value={values.name} handleChange={handleChange} labelText="name" 
                    />
                ) }
                    <FormRow   
                        type="email" name="email" 
                        value={values.email} handleChange={handleChange} labelText="email" 
                    />
                    <FormRow   
                        type="password" name="password" 
                        value={values.password} handleChange={handleChange} labelText="password" 
                    />
            <button className="btn btn-block" type="submit" disabled={isLoading}>Submit</button>
            <p>
                {  values.isMember ? "don't have an account?" : "already have an account?" }
                <button type="button" className="member-btn" onClick={toggleMember} > { values.isMember ? "Register" : "Login" } </button>
            </p>
        </form>
    </Wrapper>
  )
}

export default Register
import { useState } from 'react'
import { FormRow, Alert } from "../../components"
import { useAppContext } from '../../context/appContext'
import Wrapper from  "../../assets/wrappers/DashboardFormPage"

const Profile = () => {
     const { user, showAlert, displayAlert, updateUser, isLoading, clearAlert } = useAppContext()
     const [name, setName] = useState(user?.name)
     const [email, setEmail] = useState(user?.email)
     const [lastName, setLastName] = useState(user?.lastName)
     const [location, setLocation] = useState(user?.location)

     const handleSubmit = (e) => {
        e.preventDefault()
        console.log('update user')

        if(!name || !email || !lastName || !location) {
            displayAlert();
            clearAlert()
            return;
        }

        updateUser({ name, email, lastName, location})

        setName('')
        setEmail('')
        setLastName('')
        setLocation('')
     }

  return (
    <Wrapper>
          <form className="form" onSubmit={handleSubmit} >
             <h3> Profile </h3>
             { showAlert && <Alert /> }
             <div className="form-center">
                <FormRow 
                  type="text"
                  name="name"
                  value={name}
                  handleChange={(e) => setName(e.target.value)}
                />
                <FormRow 
                  type="text"
                  name="lastName"
                  value={lastName}
                  handleChange={(e) => setLastName(e.target.value)}
                />
                <FormRow 
                  type="email"
                  name="email"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <FormRow 
                  type="text"
                  name="location"
                  value={location}
                  handleChange={(e) => setLocation(e.target.value)}
                />
                <button className="btn btn-block" type="submit" disabled={isLoading}>
                    { isLoading ? 'Please Wait ..' : 'Save Changes' }
                </button>
             </div>
          </form>
    </Wrapper>
  )
}

export default Profile
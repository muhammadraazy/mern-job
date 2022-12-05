import { Error, Landing, ProtectedRoute, Register} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AddJob, AllJobs, Profile, SharedLayout, Stats } from "./pages/Dashboard";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={ 
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute> }>
                <Route index element={<Stats /> } />
                <Route path="add-job" element={<AddJob /> } />
                <Route path="all-jobs" element={<AllJobs /> } />
                <Route path="profile" element={<Profile /> } />
            </Route>
            <Route path="/register" element={ <Register /> } />
            <Route path="/landing" element={ <Landing /> } />
            <Route path="*" element={ <Error />} />
        </Routes>
    </Router>
  );
}

export default App;

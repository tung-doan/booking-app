import { Route, Routes } from "react-router-dom"
import Indexpage from "./pages/Indexpage"
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import AccountPage from "./pages/Account"
import PlacesPage from "./pages/placesPage"
import Placesform from "./pages/PlacesForm"
import SpecificPlace from "./pages/SpecificPlace"
import BookingPage from "./pages/BookingPage"
import SingleBookingPage from "./pages/SingleBookingPage"

// axios.defaults.baseURL = process.env.VITE_REACT_APP_BASEURL
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
console.log(import.meta.env.VITE_BASEURL)
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Indexpage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path = '/register' element={<RegisterPage />} />
        <Route path = '/account' element = {<AccountPage />} />
        <Route path = '/account/places' element = {<PlacesPage />} />
        <Route path = '/account/places/new' element = {<Placesform />} />
        <Route path = '/account/places/:id' element = {<Placesform />} />
        <Route path = '/place/:id' element = {<SpecificPlace />} />
        <Route path="/account/bookings" element = {<BookingPage />} />
        <Route path="/account/bookings/:id" element = {<SingleBookingPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App

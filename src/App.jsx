import './App.css'
import {Route, Routes} from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Header from "./components/header/Header.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Account from "./pages/account/Account.jsx";
import EditAccount from "./pages/editAccount/EditAccount.jsx";
import EditProfile from "./pages/editProfile/EditProfile.jsx";

function App() {

  return (
    <>
        <Header />
        <Navigation />
        <main>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/account/:userId' element={<Account/>}/>
                <Route path='/account/:userId/edit' element={<EditAccount/>}/>
                <Route path='/profiles/:profileId' element={<Profile/>}/>
                <Route path="/profile/:profileId/edit" element={<EditProfile/>}/>

                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </main>
        <Footer />
    </>
  )
}

export default App

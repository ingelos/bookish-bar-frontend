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
import AccountSettings from "./pages/accountSettings/AccountSettings.jsx";
import EditProfile from "./pages/editProfile/EditProfile.jsx";
import SubjectOverview from "./pages/subjectOverview/SubjectOverview.jsx";
import Subject from "./pages/subject/Subject.jsx";
import BookDetails from "./pages/bookDetails/BookDetails.jsx";
import SearchResults from "./pages/searchResults/SearchResults.jsx";
import AuthorDetails from "./pages/authorDetails/AuthorDetails.jsx";
import Trending from "./pages/trending/Trending.jsx";

function App() {

  return (
    <>
        <Header />
        <Navigation />
        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                {/*<Route path="/users/:username" element={<Account/>}/>*/}
                <Route path="/users/:username/account-settings" element={<AccountSettings/>}/>
                <Route path="/profiles/:username" element={<Profile/>}/>
                <Route path="/profiles/:username/edit" element={<EditProfile/>}/>

                <Route path="/trending" element={<Trending/>}/>
                <Route path="/subjects" element={<SubjectOverview/>}/>
                <Route path="/subjects/:subject" element={<Subject/>}/>
                <Route path="/search" element={<SearchResults/>}/>
                <Route path="/books/:bookId" element={<BookDetails/>}/>


                <Route path="/authors/:authorId" element={<AuthorDetails/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </main>
        <Footer />
    </>
  )
}

export default App

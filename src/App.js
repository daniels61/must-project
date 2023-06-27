import './App.css';
import AboutMe from './pages/AbouteMe';
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Contact from './pages/Contact';
import NewPost from './pages/NewPost';
import PostById from './pages/PostById'
// import SignIn from './components/SignIn';
import PostList from './pages/PostNew';
import Applogin from "./pages/Applogin";
import Signup from "./pages/Signup"
import EditPost from './components/EditPost';

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="about" element={<AboutMe/>} />
        <Route path="contact" element={<Contact/>} />
        <Route path="/posts/:id" element={<PostById/>} />
        <Route path="new_post" element={<NewPost/>} />
        <Route path="/posts" element={<PostList/>} />

        <Route path="login" element={<Applogin/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="/posts/:id/edit" element={<EditPost/>} />


      </Route>
    </Routes>
  

  </>
  );
}



export default App;

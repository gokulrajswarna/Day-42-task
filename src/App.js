import './App.css';
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom'
import Signup from "./components/signup";
import Signin from './components/signin';
import Forgot from './components/forgot';
import Home from './components/home';
import Resetpassword from './components/resetPassword';
function App() {
  return (
    <div className="App">
      <h1 style={{color:"whitesmoke"}}>Welcome!!!</h1>
      <Router>
        <div className='navi-bar'>
      <ul className='ul-container'>
      <li>
        <Link to={"/signup"}>Sign Up</Link>
      </li>
      <li>
        <Link to={"/signin"}>Sign In</Link>
      </li>
      <li>
        <Link to={"/forgot"}>Forgot Password</Link>
      </li>
      </ul>
      </div>
      <Routes>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/signin" element={<Signin/>}/>
          <Route exact path="/forgot" element={<Forgot/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/reset' element={<Resetpassword/>}/>
       </Routes>
       </Router>
       
    </div>
  );
}

export default App;

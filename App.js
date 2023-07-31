import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import NavBar from '../components/navbar';
import LoggedInHome from './public/pages/LoggedInHome';
import LoggedInNavbar from './public/components/LoggedInNavbar';
import CreateAccount from './public/pages/createaccount';
import Deposit from './public/pages/deposit';
import Withdraw from './public/pages/withdraw';
import Login from './public/pages/login';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { UserProvider, UserContext } from './public/components/userContext';
import { useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from "./src/components/context";
import { IconCheck, IconX } from '@tabler/icons-react';
//firebase.initializeApp(firebaseConfig);

export default function App() {
  const [user, setUser] = useState(null);

const providerValue = ({
  msg,
  setMsg,
  userEmail,
  setUserEmail,
  updateUserEmail,
  userName,
  updateUserName,
  userToken,
  updateUserToken,
})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <UserContext.Provider value={providerValue}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/createaccount"
            element={
              <>
                <CreateAccount name="" email="" password="" />
              </>
            }
          />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <LoggedInNavbar />
        <LoggedInHome />
        <Deposit />
        <Withdraw />
        <CreateAccount />
        <Login />
      </Router>
    </UserContext.Provider>
  );
}

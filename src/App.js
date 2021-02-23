import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Login from './components/LoginScreen/LoginScreen';
import {BrowserRouter , Switch ,Route , Link} from 'react-router-dom';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email,
        }));
      }else{
        dispatch(logout());
      }
    });

    return unsubscribe;
  },[dispatch]);
  return (
    <div className="app">
      <BrowserRouter>
        { !user ? 
          (
            <Login />
          )  :  (
            <Switch>
              <Route path="/profile">
                <ProfileScreen />
              </Route>
              <Route exact path="/">
                <HomeScreen />
              </Route>
            </Switch>
          ) 

        }
        
      </BrowserRouter>
    </div>
  );
}

export default App;

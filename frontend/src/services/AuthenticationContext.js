import { createContext, useState } from "react"
import messagePopup from "./MessagePopup";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const path = "";

    const checkLoggedUser = () => {
        setIsLoading(true);

          //if(userToken !== null){
            const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'authorization' : localStorage.getItem('token') }
            };
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/validate`, requestOptions).then(res => res.json()).then(async data => {
              if(data.user){
                setUser(data.user);
              }else{
                setUser(null);
                setError(data.message);
                messagePopup('error', data.message);
              }
              setIsLoading(false);
            });
         // }
          //return false;
        
    }

    const onLogin = (username, password) => {
        //setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username : username,password : password})
          };
          fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, requestOptions).then(res => res.json()).then(async data => {
            if(data.user !== undefined && data.user !== null){
              messagePopup('success', data.message);
              setUser(data.user);
              localStorage.setItem('token', data.userToken);
              
            }else{
              messagePopup('error', data.message);
              setError(data.message);
            }
            //setIsLoading(false);
          });
    }

    const onRegister = (userDetails) => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails)
          };
          fetch(path+'user/userAdd', requestOptions).then(res => res.json()).then(async data => {
            if(data.user !== undefined && data.user !== null){
              setUser(data.user);
              messagePopup('success', data.message);
            }else{
              setError(data.message);
              messagePopup('error', data.message);
            }
            setIsLoading(false);
          });
    }

    const onLogout = () => {
      setIsLoading(true);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'authorization' : localStorage.getItem('token') }
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, requestOptions).then(res => res.json()).then(async data => {
          if(data.isSuccess){
            setUser(null);
            localStorage.removeItem('token');
            messagePopup('success', data.message);
          }else{
            setError(data.message);
            messagePopup('error', data.message);
          }
          
          setIsLoading(false);
        });
    }

    const updateUser = (userDetails) => {
      setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization' : localStorage.getItem('token') },
            body: JSON.stringify(userDetails)
          };
          fetch(path+'user/userUpdate', requestOptions).then(res => res.json()).then(async data => {
            if(data.user !== undefined && data.user !== null){
              setUser(data.user);
              messagePopup('success', data.message);
            }else{
              setError(data.message);
              messagePopup('error', data.message);
            }
            
            setIsLoading(false);
          });
    }

    return (
    <AuthenticationContext.Provider
        value={{
            isLoading,
            user,
            error,
            onLogin,
            onRegister,
            onLogout,
            checkLoggedUser,
            updateUser
        }}
    >
        {children}  
    </AuthenticationContext.Provider>
    );
}
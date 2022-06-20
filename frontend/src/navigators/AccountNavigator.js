import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import { AuthenticationContext } from '../services/AuthenticationContext';
import AppNavigator from './AppNavigator';

const AccountNavigator = () => {
  
  const {user, checkLoggedUser} = useContext(AuthenticationContext);

  useEffect(()=>{
    if(!user){
      checkLoggedUser();
    }
  },[user])
  
  if(!user){
    return (<Login />)
  }

  return (
    <BrowserRouter>
        <AppNavigator />
    </BrowserRouter>
    );
}

export default AccountNavigator;
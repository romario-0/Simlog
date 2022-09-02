import {AuthenticationContextProvider} from './services/AuthenticationContext';
import './App.css';
import AccountNavigator from './navigators/AccountNavigator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AuthenticationContextProvider>
        <ToastContainer />
        <AccountNavigator />
      </AuthenticationContextProvider>
    </div>
  );
}

export default App;

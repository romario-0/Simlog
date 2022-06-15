import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import LogList from '../components/LogLibrary/LogList';
import LogUpload from '../components/LogLibrary/LogUpload';
import NavBar from '../components/NavBar';

const AccountNavigator = () => {
    return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/logLibrary' element={<LogList />} />
          <Route path='/logUpload' element={<LogUpload />} />
        </Routes>
    </BrowserRouter>
    );
}

export default AccountNavigator;
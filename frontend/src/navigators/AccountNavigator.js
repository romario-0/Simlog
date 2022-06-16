import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import JobDetails from '../components/Jobs/JobDetails';
import JobList from '../components/Jobs/JobList';
import Login from '../components/Login';
import LogList from '../components/LogLibrary/LogList';
import LogTypeDetails from '../components/LogLibrary/LogTypeDetails';
import LogTypeList from '../components/LogLibrary/LogTypeList';
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
          <Route path='/logTypes' element={<LogTypeList />} />
          <Route path='/logTypeUpdate' element={<LogTypeDetails />} />
          <Route path='/jobs' element={<JobList />} />
          <Route path='/jobUpdate' element={<JobDetails />} />
        </Routes>
    </BrowserRouter>
    );
}

export default AccountNavigator;
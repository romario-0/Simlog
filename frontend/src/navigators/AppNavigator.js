import { Routes, Route } from 'react-router-dom';
import CollectorDetails from '../components/CollectorIP/CollectorDetails';
import CollectorList from '../components/CollectorIP/CollectorList';
import Header from '../components/Header';
import Home from '../components/Home';
import JobDetails from '../components/Jobs/JobDetails';
import JobList from '../components/Jobs/JobList';
import LogUpload from '../components/LogLibrary/LogUpload';
import NavBar from '../components/NavBar';
import SourceDetails from '../components/SourceIP/SourceDetails';
import SourceList from '../components/SourceIP/SourceList';
import LogTypeDetails from '../components/LogLibrary/LogTypeDetails';

const AppNavigator = () => {
    return (
    <div>
        <Header />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logLibrary' element={<LogUpload />} />
          <Route path='/logTypes/:id' element={<LogTypeDetails />} />
          <Route path='/jobs/:id' element={<JobDetails />} />
          <Route path='/sources/:id' element={<SourceDetails />} />
          <Route path='/collectors/:id' element={<CollectorDetails />} />
        </Routes>
    </div>
    );
}

export default AppNavigator;
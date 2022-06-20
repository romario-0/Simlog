import { Routes, Route } from 'react-router-dom';
import CollectorDetails from '../components/CollectorIP/CollectorDetails';
import CollectorList from '../components/CollectorIP/CollectorList';
import Header from '../components/Header';
import Home from '../components/Home';
import JobDetails from '../components/Jobs/JobDetails';
import JobList from '../components/Jobs/JobList';
import LogList from '../components/LogLibrary/LogList';
import LogTypeDetails from '../components/LogLibrary/LogTypeDetails';
import LogTypeList from '../components/LogLibrary/LogTypeList';
import NavBar from '../components/NavBar';
import SourceDetails from '../components/SourceIP/SourceDetails';
import SourceList from '../components/SourceIP/SourceList';

const AppNavigator = () => {
    return (
    <div>
        <Header />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logLibrary' element={<LogList />} />
          <Route path='/logTypes' element={<LogTypeList />} />
          <Route path='/logType/:id' element={<LogTypeDetails />} />
          <Route path='/jobs' element={<JobList />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/sources' element={<SourceList />} />
          <Route path='/source/:id' element={<SourceDetails />} />
          <Route path='/collectors' element={<CollectorList />} />
          <Route path='/collector/:id' element={<CollectorDetails />} />
        </Routes>
    </div>
    );
}

export default AppNavigator;
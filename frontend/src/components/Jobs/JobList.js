import { Link } from "react-router-dom";

const JobList = () => {
    return (
        <div>
            <Link to={'/job/0'}>Add new Job</Link>
        </div>
    );
}

export default JobList;
import { Link } from "react-router-dom";

const JobList = () => {
    return (
        <div>
            <Link to={'/jobUpdate'}>Add new Job</Link>
        </div>
    );
}

export default JobList;
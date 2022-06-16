import { Link } from "react-router-dom";

const LogTypeList = () => {
    return (
        <div>
            <Link to={'/logTypeUpdate'}>Add new Type</Link>
        </div>
    );
}

export default LogTypeList;
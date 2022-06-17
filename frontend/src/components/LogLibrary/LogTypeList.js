import { Link } from "react-router-dom";

const LogTypeList = () => {
    return (
        <div>
            <Link to={'/logType/0'}>Add new Type</Link>
        </div>
    );
}

export default LogTypeList;
import { Link } from "react-router-dom";

const LogList = () => {
    return (
        <div>
            <h3>List of Log Uploads</h3>
            <Link to="/logUpload">Upload</Link>
        </div>
    );
}

export default LogList;
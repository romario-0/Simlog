import { Link } from "react-router-dom";

const SourceList = () => {
    return (
        <div>
            <Link to={'/source/0'}>Add new Source</Link>
        </div>
    );
}

export default SourceList;
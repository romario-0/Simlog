import { Link } from "react-router-dom";

const CollectorList = () => {
    return (
        <div>
            <Link to={'/collector/0'}>Add new Collector</Link>
        </div>
    );
}

export default CollectorList;
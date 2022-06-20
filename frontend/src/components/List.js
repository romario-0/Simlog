import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const List = ({listOptions, data, headers}) => {

    //const [displayData, setDisplayData] = useState([]);

    const createTableHeader = () => {
        return headers.map(ele => (<th key={ele.key}>{ele.value}</th>))
    }

    const createTableData = () => {
        return data.map(ele => (
            <tr key={ele._id}>
                {headers.map(key => {
                    if(key.prop === 'date'){
                        const date = new Date(ele[key.prop]);
                        return (<td key={`${ele._id}_${key.prop}`}>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</td>)
                    }else{
                        return (<td key={`${ele._id}_${key.prop}`}>{ele[key.prop]}</td>)
                    }
                })}
                {listOptions.editLink && <td><Link to={`/${listOptions.editLink}/${ele._id}`}>Edit</Link></td>}
            </tr>
        ));
    }
    return (
        data &&
        <div className="container">
        <Table striped bordered hover>
             <thead><tr>{createTableHeader()}</tr>{listOptions.editLink && <tr></tr>}</thead>
             <tbody>{createTableData()}</tbody>
        </Table>
        </div>
    );
}

export default List;
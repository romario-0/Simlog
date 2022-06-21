import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const List = ({listOptions, data, headers}) => {

    const [toogle, setToogle] = useState([]);

    useEffect(() => {
        if(listOptions.actions){
            setToogle(listOptions.actions[0]);
        }
    },[])

    const createTableHeader = () => {
        return headers.map(ele => (<th key={ele.key}>{ele.value}</th>))
    }

    const handleAction = (objId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id : objId})
        };
        //fetch(`${process.env.REACT_APP_BACKEND_URL}/${toogle.stateAction}`, requestOptions).then( res => res.json() ).then( data => {
            if(toogle === listOptions.actions[0]){
                setToogle(listOptions.actions[1]);
            }else{
                setToogle(listOptions.actions[0]);
            }
        //});
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
                {listOptions.actions && <td><button onClick={() => handleAction(ele._id)}>{toogle.stateName}</button></td>}
            </tr>
        ));
    }
    return (
        data &&
        <div className="container">
        <Table striped bordered hover>
             <thead><tr>{createTableHeader()}{listOptions.editLink && <th></th>}{listOptions.actions && <th></th>}</tr></thead>
             <tbody>{createTableData()}</tbody>
        </Table>
        </div>
    );
}

export default List;
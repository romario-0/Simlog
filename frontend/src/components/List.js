import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const List = ({listOptions, data, headers}) => {

    const createTableHeader = () => {
        return headers.map(ele => (<th key={ele.key}>{ele.value}</th>))
    }

    const handleAction = (objId) => {
        const obj = {};
        obj[listOptions.actions.prop] = objId;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/${listOptions.actions.stateAction}`, requestOptions).then( res => res.json() ).then( data => {
        });
    }

    const createTableData = () => {
        return data.map(ele => (
            <tr key={ele._id}>
                {headers.map(key => {
                    if(key.subProps){
                        return (<td key={`${ele._id}_${key.prop}`}>{formatData(ele, key.prop, key.subProps)}</td>)
                    }else if(key.prop === 'date'){
                        const date = new Date(ele[key.prop]);
                        return (<td key={`${ele._id}_${key.prop}`}>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</td>)
                    }else{
                        return (<td key={`${ele._id}_${key.prop}`}>{ele[key.prop]}</td>)
                    }
                })}
                {listOptions.editLink && !listOptions.editCondition && <td><Link to={`/${listOptions.editLink}/${ele._id}`}>Edit</Link></td>}
                {listOptions.editLink && listOptions.editCondition && ele[listOptions.editCondition.field] === listOptions.editCondition.value && <td><Link to={`/${listOptions.editLink}/${ele._id}`}>Edit</Link></td>}
                {listOptions.actions && <td><button onClick={() => handleAction(ele._id)}>{listOptions.actions.stateName}</button></td>}
            </tr>
        ));
    }

    const formatData = (ele, prop, subProps) => {
        let data = subProps.format;
        for(let i=0; i < subProps.props.length ; i++){
            const key = subProps.props[i];
            data = data.replace(`##prop${i}##`, ele[prop][0][key]);
        }
        return data;
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
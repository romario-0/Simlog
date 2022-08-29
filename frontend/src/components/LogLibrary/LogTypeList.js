import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List";

const LogTypeList = ({logTypeList, reload}) => {

    const headers = [
        {prop : 'logTypeName', value : 'Log Type Name'},
        {prop : 'patternType', value : 'Pattern'}
    ];

    const listOptions = {
        editLink : 'logTypes',
        deleteLink : 'logType'
    };

    const handleReload = () => {
        reload();
    }

    return (
        <div>
            <List data={logTypeList} headers={headers} listOptions={listOptions} reload={handleReload}></List>
        </div>
    );
}

export default LogTypeList;
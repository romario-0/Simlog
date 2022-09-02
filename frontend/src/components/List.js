import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { getDeepValue, formatDate } from '../services/CommonUtils';
import { AuthenticationContext } from "../services/AuthenticationContext";
import { deleteCollector } from "../services/collector.service";
import { deleteJob } from "../services/job.service";
import { deleteSimulation } from "../services/simulation.service";
import { deleteLog } from "../services/log.service";
import { deleteLogType } from "../services/logType.service";
import { deleteSource } from "../services/source.service";
import { activationUser } from "../services/user.service";

const List = ({ listOptions, data, headers, reload }) => {

    const { postMessage } = useContext(AuthenticationContext);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalCallLink, setModalCallLink] = useState("");
    const [selectedObj, setSelectedObj] = useState(null);
    const [deleteLink, setDeleteLink] = useState(null);
    const handleClose = () => setShowModal(false);
    const navigate = useNavigate();

    const createTableHeader = () => {
        return headers.map(ele => (<th key={ele.key}>{ele.value}</th>))
    }

    const handleAction = (objId, action) => {
        const obj = {};
        obj[action.prop] = objId;
        obj['action'] = action.stateAction;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/${action.actionUrl}`, requestOptions).then(res => res.json()).then(data => {
            //Handle success or failure
        });
    }

    const openModal = (obj, link, actionType) => {
        setSelectedObj(obj);
        
        if(actionType.toUpperCase() === 'DELETE'){
            setDeleteLink(link);
            setModalMessage('Are you sure you want to delete?');
        }else {
            setModalCallLink(link);
            setModalMessage(`Are you sure you want to ${actionType.toLowerCase()}?`);
        }
        setShowModal(true);
    }

    const handleCall = async () => {
        setShowModal(false);
        if(modalCallLink.toUpperCase() === 'ACTIVATE'){
            data = await activationUser(modalCallLink, selectedObj._id);
                if (data.user) {
                    reload();
                }
        }else if(modalCallLink.toUpperCase() === 'DEACTIVATE'){
            data = await activationUser(modalCallLink, selectedObj._id);
                if (data.user) {
                    reload();
                }
        }else{
            handleDelete();
        }
    }

    const handleDelete = async () => {
        //setShowModal(false);
        let data = null;
        switch (deleteLink.toLowerCase()) {
            case 'collector': data = await deleteCollector(selectedObj._id);
                if (data.collector) {
                    reload();
                }
                break;
            case 'source': data = await deleteSource(selectedObj._id);
                if (data.source) {
                    reload();
                }
                break;
            case 'logtype': data = await deleteLogType(selectedObj._id);
                if (data.logType) {
                    reload();
                }
                break;
            case 'log': data = await deleteLog(selectedObj._id);
                if (data.log) {
                    reload();
                }
                break;
            case 'job': data = await deleteJob(selectedObj._id);
                if (data.job) {
                    reload();
                }
                break;
        }
    }

    const createTableData = () => {
        return data.map(ele => (
            <tr key={ele._id}>
                {headers.map(key => {
                    if (key.subProps) {
                        return (<td key={`${ele._id}_${key.prop}`}>{formatSubData(ele, key.prop, key.subProps)}</td>)
                    } else if (key.format) {
                        return (<td key={`${ele._id}_${key.prop}`}>{formatData(getDeepValue(ele, key.prop), key.format)}</td>)
                    } else {
                        return (<td key={`${ele._id}_${key.prop}`}>{getDeepValue(ele, key.prop)}</td>)
                    }
                })}
                {(listOptions.actions || listOptions.editLink) && <td>
                    {listOptions.editLink && !listOptions.editCondition && <Link className="btn btn-primary" to={`/${listOptions.editLink}/${ele._id}`}>Edit</Link>}
                    {listOptions.editLink && listOptions.editCondition && ele[listOptions.editCondition.field].toUpperCase() === listOptions.editCondition.value.toUpperCase() && <Link className="btn btn-primary" to={`/${listOptions.editLink}/${ele._id}`}>Edit</Link>}
                    {//listOptions.editLink && listOptions.editCondition && ele[listOptions.editCondition.field].toUpperCase() !== listOptions.editCondition.value.toUpperCase() && <td></td>
                    }
                    {listOptions.deleteLink && !listOptions.deleteCondition && <button className="btn btn-primary" onClick={() => openModal(ele, listOptions.deleteLink, 'DELETE')}>Delete</button>}
                    {listOptions.deleteLink && listOptions.deleteCondition && ele[listOptions.deleteCondition.field].toUpperCase() === listOptions.deleteCondition.value.toUpperCase() && <button className="btn btn-primary" onClick={() => openModal(ele, listOptions.deleteLink, 'DELETE')}>Delete</button>}

                    {listOptions.activation && !ele.isActive && <button className="btn btn-primary" onClick={() => openModal(ele, `activate`, 'ACTIVATE')}>Activate</button>}
                    {listOptions.activation && ele.isActive && <button className="btn btn-primary" onClick={() => openModal(ele, `deactivate`, 'DEACTIVATE')}>Deactivate</button>}

                    {listOptions.actions && listOptions.actions.map(action => (<button key={`${ele._id}_${action.stateName}`} className="btn btn-primary" onClick={() => handleAction(ele._id, action)}>{action.stateName}</button>))
                    }
                </td>}
            </tr>
        ));
    }

    const formatSubData = (ele, prop, subProps) => {
        let data = subProps.format;
        for (let i = 0; i < subProps.props.length; i++) {
            const key = subProps.props[i];
            data = data.replace(`##prop${i}##`, ele[prop][0][key]);
        }
        return data;
    }

    const formatData = (data, format) => {
        switch (format.toUpperCase()) {
            case 'DATE': const date = new Date(data);
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
            case 'FILE_SIZE': const size = Math.round(data * 1000000) / 1000;
                return `${size} KB`;
        }
    }

    return (
        data &&
        <div className="container">
            <Table className={listOptions.tableClass} striped bordered hover>
                <thead><tr>{createTableHeader()}{listOptions.editLink && <th>Actions</th>}{listOptions.actions && <th>Actions</th>}</tr></thead>
                <tbody>{createTableData()}</tbody>
            </Table>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Simlog</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleCall}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default List;
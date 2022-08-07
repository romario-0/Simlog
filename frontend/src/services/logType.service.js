import messagePopup from "./MessagePopup";

const deleteLogType = () => {

}

const createLogType = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes/save`, requestOptions).then( res => res.json() ).then( data => {
        if(data.logType){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const updateLogType = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes/update`, requestOptions).then( res => res.json() ).then( data => {
        if(data.logType){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createLogType, updateLogType }
import messagePopup from "./MessagePopup";

const deleteLog = async (logId) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/logs/remove/${logId}`, requestOptions).then( res => res.json() ).then( data => {
        if(data.log){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const createLog = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/logs/upload`, requestOptions).then( res => res.json() ).then( data => {
        if(data.log){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createLog, deleteLog }
import messagePopup from "./MessagePopup";

const deleteJob = async (jobId) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/remove/${jobId}`, requestOptions).then( res => res.json() ).then( data => {
        if(data.job){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const createJob = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/save`, requestOptions).then( res => res.json() ).then( data => {
        if(data.job){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const updateJob = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/update`, requestOptions).then( res => res.json() ).then( data => {
        if(data.job){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createJob, updateJob, deleteJob }
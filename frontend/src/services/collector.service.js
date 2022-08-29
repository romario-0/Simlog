import messagePopup from "./MessagePopup";

const deleteCollector = async (collectorId) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectors/remove/${collectorId}`, requestOptions).then( res => res.json() ).then( data => {
        if(data.collector){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const createCollector = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectors/save`, requestOptions).then( res => res.json() ).then( data => {
        if(data.collector){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const updateCollector = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectors/update`, requestOptions).then( res => res.json() ).then( data => {
        if(data.collector){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createCollector, updateCollector, deleteCollector }
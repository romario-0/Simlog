import messagePopup from "./MessagePopup";

const deleteCollector = () => {

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

export { createCollector, updateCollector }
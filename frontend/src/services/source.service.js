import messagePopup from "./MessagePopup";

const deleteSource = () => {

}

const createSource = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/sources/save`, requestOptions).then( res => res.json() ).then( data => {
        if(data.source){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const updateSource = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/sources/update`, requestOptions).then( res => res.json() ).then( data => {
        if(data.source){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createSource, updateSource }
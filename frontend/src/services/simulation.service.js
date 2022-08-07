import messagePopup from "./MessagePopup";

const deleteSimulation = () => {

}

const createSimulation = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/save`, requestOptions).then( res => res.json() ).then( data => {
        if(data.simulation){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const updateSimulation = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/update`, requestOptions).then( res => res.json() ).then( data => {
        if(data.simulation){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createSimulation, updateSimulation }
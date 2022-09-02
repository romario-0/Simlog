import messagePopup from "./MessagePopup";

const deleteSimulation = async (simulationId) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/remove/${simulationId}`, requestOptions).then( res => res.json() ).then( data => {
        if(data.simulation){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
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

export { createSimulation, updateSimulation, deleteSimulation }
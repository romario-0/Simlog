import messagePopup from "./MessagePopup";

const deleteDataset = async (datasetId) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/datasets/remove/${datasetId}`, requestOptions).then(res => res.json()).then(data => {
        if (data.dataset) {
            messagePopup('success', data.message);
        } else {
            messagePopup('error', data.message);
        }
        return data;
    });
}

const createDataset = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/datasets/save`, requestOptions).then(res => res.json()).then(data => {
        if (data.dataset) {
            messagePopup('success', data.message);
        } else {
            messagePopup('error', data.message);
        }
        return data;
    });
}

const updateDataset = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/datasets/update`, requestOptions).then(res => res.json()).then(data => {
        if (data.dataset) {
            messagePopup('success', data.message);
        } else {
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createDataset, updateDataset, deleteDataset }
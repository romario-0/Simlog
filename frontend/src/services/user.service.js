import messagePopup from "./MessagePopup";

const activationUser = async (link, userId) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${link}/${userId}`, requestOptions).then( res => res.json() ).then( data => {
        if(data.user){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const createUser = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, requestOptions).then( res => res.json() ).then( data => {
        if(data.user){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

const updateUser = async (requestOptions) => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/update`, requestOptions).then( res => res.json() ).then( data => {
        if(data.user){
            messagePopup('success', data.message);
        }else{
            messagePopup('error', data.message);
        }
        return data;
    });
}

export { createUser, updateUser, activationUser }
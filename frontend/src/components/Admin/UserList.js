import List from "../List";

const UserList = ({userList, reload}) => {
    
    const headers = [
        {prop : 'username', value : 'Username'},
        {prop : 'firstName', value : 'First Name'},
        {prop : 'lastName', value : 'Last Name'},
        {prop : 'email', value : 'Email'},
        {prop : 'mobile', value : 'Mobile'}
    ];

    const listOptions = {
        tableClass : 'userTable',
        editLink : 'users',
        activation : false
    };

    const handleReload = () => {
        reload();
    }

    return (
        <div>
            <List data={userList} headers={headers} listOptions={listOptions} reload={handleReload}></List>
        </div>
    );
}

export default UserList;
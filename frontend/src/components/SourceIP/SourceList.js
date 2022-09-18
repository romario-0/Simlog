import List from "../List";

const SourceList = ({sourceList, reload}) => {
    
    const headers = [
        {prop : 'sourceName', value : 'Source Name'},
        {prop : 'fromIP', value : 'From IP'},
        {prop : 'toIP', value : 'To IP'}
    ];

    const listOptions = {
        tableClass : 'sourceTable',
        editLink : 'sources',
        deleteLink : 'source'
    };

    const handleReload = () => {
        reload();
    }

    return (
        <div>
            <List data={sourceList} headers={headers} listOptions={listOptions} reload={handleReload}></List>
        </div>
    );
}

export default SourceList;
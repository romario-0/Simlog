import List from "../List";

const CollectorList = ({collectorList, reload}) => {

    const headers = [
        {prop : 'collectorName', value : 'Collector Name'},
        {prop : 'collectorIP', value : 'Collector IP'},
        {prop : 'collectorPort', value : 'Collector Port'}
    ];

    const listOptions = {
        tableClass : 'collectorTable',
        editLink : 'collectors',
        deleteLink : 'collector'
    };

    const handleReload = () => {
        reload();
    }

    return (
        <div>
            <List data={collectorList} headers={headers} listOptions={listOptions} reload={handleReload} ></List>
        </div>
    );
}

export default CollectorList;
import List from "../List";

const DatasetList = ({ datasetList, reload }) => {

    const headers = [
        { prop: 'datasetName', value: 'Dataset Name' },
        { prop: 'delimiter', value: 'Delimiter' },
        { prop: 'datasetCollection', value: 'Collection' },
    ];

    const listOptions = {
        tableClass: 'datasetTable',
        editLink: 'dataset',
        deleteLink: 'dataset'
    };

    const handleReload = () => {
        reload();
    }

    return (
        <div>
            <List data={datasetList} headers={headers} listOptions={listOptions} reload={handleReload} ></List>
        </div>
    );
}

export default DatasetList;
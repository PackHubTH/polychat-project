import GetTimestamp from './Time/GetTimestamp';
const GenerateUid = () => {
    return (
        Math.floor(100000000 + Math.random() * 900000000).toString() +
    GetTimestamp()
    );
};

export default GenerateUid;

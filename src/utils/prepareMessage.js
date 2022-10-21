import _ from "lodash";

const prepareMessage = (messageObj) => {
    let message='';
    for(let i in messageObj){
        _.find( (o)=>{ return o.name === i });
        message=message+` ${messageObj[i]} <br>`
    }
    return message
};
export default prepareMessage;

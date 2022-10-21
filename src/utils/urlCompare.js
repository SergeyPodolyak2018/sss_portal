const urlCompare = (first,second) => {
    let arrayOfStrings1 = first.split('/');
    let arrayOfStrings2 = second.split('/');
    if(arrayOfStrings1[1]===arrayOfStrings2[1]){
        return true;
    }
    return false;
};
export default urlCompare;

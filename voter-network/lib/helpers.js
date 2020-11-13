module.exports = {
    checkZIP,
}

function checkZIP(inputZIP) {
    retVal = true;
    if (inputZIP.length == 5)
        for (i = 0; i < 5; i++) {
            if (isNaN(inputZIP.substr(i,1)))
            retVal = false;
        }
    else
        retVal = false;

    return retVal;
}
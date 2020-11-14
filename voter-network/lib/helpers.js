module.exports = {
    checkZIP,
    createId
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

function createId() {
    finalHash = ''
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz!*$@';

    for(i=0; i < 64; i++) {
        randomChar = alphaNum[Math.floor(Math.random() * alphaNum.length)];
        finalHash = finalHash + randomChar;
    }

    return finalHash;
}

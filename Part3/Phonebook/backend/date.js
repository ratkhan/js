
const getDateStringCustom = () => {
    const oDate = new Date();
    var sDate = '';
    if (oDate instanceof Date) {
        sDate = oDate.getYear() + 1900
            + ':'
            + ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
            + ':' + oDate.getDate()
            + ':' + oDate.getHours()
            + ':' + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())
            + ':' + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
    } else {
        throw new Error('oDate is not an instance of Date');
    }
    return sDate;
};

module.exports = getDateStringCustom();
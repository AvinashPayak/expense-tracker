const createPayload = (...payloads) => {
    console.log("inside createPayload");
    return Object.assign({}, ...payloads);
}

module.exports = {
    createPayload,
}
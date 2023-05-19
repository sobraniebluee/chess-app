function createUniqId(length = 12) {
    let id = Math.floor((Math.random() * 9) + 1).toString();
    for (let i = 0;i < length - 5;i++) {
        id += Math.floor((Math.random() * 9));
    }
    id += (new Date().getTime() % 10000).toString();
    return parseInt(id);
}

export {createUniqId};
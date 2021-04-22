export const findTopic = (arr, key, value) => {
    return arr.filter(item => item[key].toUpperCase().includes(value.toUpperCase()))
}

export const findVocab = (arr, key1, key2, value) => {
    return arr.filter(item => item[key1].toUpperCase().includes(value.toUpperCase()) || item[key2].toUpperCase().includes(value.toUpperCase()))
}

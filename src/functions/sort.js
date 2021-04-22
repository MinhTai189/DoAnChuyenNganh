export const sortTopic = (arr, value) => {
    const mapSort = (value) => {
        switch (value) {
            case 'alphabet':
                return 'topic'
            case 'date':
                return 'dateCreated'
            case 'quantity':
                return 'countVocab'
            default:
                return value
        }
    }

    if (value === null)
        return arr;
    const sort = mapSort(value.order);
    const isAsc = value.column === 'asc' ? true : false;

    return arr.sort((element1, element2) => {
        const value1 = typeof (element1[sort]) === 'string' ? element1[sort].toUpperCase() : element1[sort];
        const value2 = typeof (element2[sort]) === 'string' ? element2[sort].toUpperCase() : element2[sort];

        if (value1 < value2) {
            return isAsc ? -1 : 1;
        }
        if (value1 > value2) {
            return isAsc ? 1 : -1;
        }
        return 0;
    })
}

export const sortVocab = (arr, value) => {
    const mapSort = (value) => {
        switch (value) {
            case 'alphabet':
                return 'en'
            case 'date':
                return 'dateCreated'
            case 'quantity':
                return 'scoreWrong'
            default:
                return value
        }
    }

    if (value === null)
        return arr;
    const sort = mapSort(value.order);
    const isAsc = value.column === 'asc' ? true : false;
    return arr.sort((element1, element2) => {
        const value1 = typeof (element1[sort]) === 'string' ? element1[sort].toUpperCase() : element1[sort];
        const value2 = typeof (element2[sort]) === 'string' ? element2[sort].toUpperCase() : element2[sort];

        if (value1 < value2) {
            return isAsc ? -1 : 1;
        }
        if (value1 > value2) {
            return isAsc ? 1 : -1;
        }
        return 0;
    })
}
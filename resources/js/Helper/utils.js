export const getKeyListFromData = (data, key) => {
    return [...new Set(data.map((item) => item[key]))].sort();
};

export const groupDataByKeyValue = (data, accessor) => {
    return data.reduce((acc, current) => {
        const currentKey = current[accessor];
        if (!acc[currentKey]) {
            acc[currentKey] = [];
        }
        acc[currentKey].push(current);
        return acc;
    }, {});
};
export const transformData = (data, transformerCallback) =>
    Object.keys(data).map(transformerCallback);

/**
 *
 * @param {String} key - Key값은 start&end형식으로 설정.
 * ex) 2024.09.11&2024.09.13
 * @param {Object} data - 문의 Raw Data
 */
export const saveToSessionStorage = (key, data) => {
    const saveData = {
        key: key,
        data: data,
        updated_at: new Date().getTime(),
    };
    sessionStorage.setItem(key, JSON.stringify(saveData));
};

/**
 *
 * @param {String} key - Key값은 start&end형식으로 설정.
 * ex) 2024.09.11&2024.09.13
 * @returns {Array} 없으면 빈값반환
 */
export const loadFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    const parsedData = JSON.parse(storedData);
    return storedData ? parsedData : null;
};

import { useMemo, useState } from "react";
const getUniqueKeysFromArray = (data, key) => [
    ...new Set(data.map((item) => item[key])),
];
export const useMakeStatistics = (data) => {
    if (!(data instanceof Array) || data.length === 0) {
        return { productList: [], managerList: [] };
    }
    const productList = useMemo(
        () => getUniqueKeysFromArray(data, "product"),
        [data]
    );
    const mangerList = useMemo(
        () => getUniqueKeysFromArray(data, "assigned_manager"),
        [data]
    );

    return { productList, mangerList };
};

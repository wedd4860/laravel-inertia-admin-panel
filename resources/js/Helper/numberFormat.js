export function numberFormat(val) {
    if (isNaN(val) || !val) {
        return "0";
    }
    return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const commaSeparateNumber = (v) =>
    new Intl.NumberFormat("ko-KR").format(v);

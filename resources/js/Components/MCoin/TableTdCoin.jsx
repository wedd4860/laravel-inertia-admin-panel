import { numberFormat } from "@/Helper/numberFormat";

export default function TableTdCoin({
    className = "",
    children,
    mcoin = 0,
    ...props
}) {
    return (
        <td {...props} className={className}>
            <div className="min-w-16 py-1">{numberFormat(mcoin)}</div>
            {children}
        </td>
    );
}

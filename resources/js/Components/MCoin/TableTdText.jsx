export default function TableTdText({
    className = "",
    children,
    text = "",
    ...props
}) {
    return (
        <td {...props} className={className}>
            <div className="min-w-16 py-1">{text}</div>
            {children}
        </td>
    );
}

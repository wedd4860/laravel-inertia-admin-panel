export default function TableThTitle({
    className = "",
    children,
    title,
    ...props
}) {
    return (
        <th {...props} className={className}>
            <div className="min-w-16 py-2">{title}</div>
            {children}
        </th>
    );
}

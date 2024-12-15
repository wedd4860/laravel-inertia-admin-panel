export default function CardCharacter({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <div
            {...props}
            className={`bg-white shadow-md rounded-lg p-4 border ` + className}
        >
            {value ? value : children}
        </div>
    );
}

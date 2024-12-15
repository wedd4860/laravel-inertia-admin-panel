import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
    name,
    sortable = true,
    sort_column = null,
    order_type = null,
    sortChanged = () => {},
    thClassName,
    children,
}) {
    return (
        <th onClick={(e) => sortChanged(name)} className={thClassName}>
            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_column === name && order_type === "asc"
                                    ? "text-black"
                                    : "text-gray-500")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-2 " +
                                (sort_column === name && order_type === "desc"
                                    ? "text-black"
                                    : "text-gray-500")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}

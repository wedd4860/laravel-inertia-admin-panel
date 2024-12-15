import { Link, usePage } from "@inertiajs/react";

const routes = [
    {
        name: "CS",
        route_path: "kr.cs.member.info.index",
    },
    {
        name: "MSPC",
        route_path: "kr.mspc.creators.group.index",
    },
    {
        name: "GZ",
        route_path: "kr.gz.service.status.show",
    },
    {
        name: "NX",
        route_path: "kr.nx.service.status.show",
    },
    {
        name: "LH",
        route_path: "kr.lh.service.status.show",
    },
    {
        name: "FH",
        route_path: "kr.fh.service.status.show",
    },
];

const NavigationHeader = () => {
    const { url, component } = usePage();
    const auth = usePage().props.auth;
    const permissionGroup = auth.member.member_t_permission_group;

    return (
        <aside className="fixed flex flex-col gap-y-3 bg-white border-r border-gray-200 w-[80px] inset-0 mt-[66px] pt-[20px] items-center">
            {routes.map((item, index) => {
                if (permissionGroup.permission_group !== 'ALL' && !permissionGroup.permission_group.includes(item.name)) {
                    return false;
                }
                const postFix = route(item.route_path).split(
                    window.location.origin
                )[1];
                return (
                    <Link
                        key={index}
                        href={route(item.route_path)}
                        className={`flex items-center justify-center font-black w-[50px] h-[50px] rounded-lg text-center text-[12px] overflow-wrap break-all ${
                            url === postFix
                                ? "bg-blue-800 text-white"
                                : "bg-white text-black"
                        }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </aside>
    );
};

export default NavigationHeader;

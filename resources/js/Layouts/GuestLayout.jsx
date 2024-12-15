import LogoCtrlhubText from "@/Components/Icon/LogoCtrlhubText";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-6 bg-gray-100">
            <div>
                <Link href="/">
                    <LogoCtrlhubText className="size-24 mt-1" />
                </Link>
            </div>

            <div className="w-full max-w-md mt-8 bg-white shadow-md overflow-hidden rounded-lg">
                {children}
            </div>
        </div>
    );
}

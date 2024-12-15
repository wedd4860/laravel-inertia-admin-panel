import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="controller hub" />
            <div className="min-h-screen flex flex-col justify-center items-center pt-6 bg-gray-100">
                <div className="w-full max-w-md mt-6 bg-white shadow-md overflow-hidden rounded-lg">
                    <header>
                        <div
                            className="text-red-800 bg-red-50 border-t-4 border-red-500 text-yellow-700 px-4 py-8 w-full"
                            role="alert"
                        >
                            <span className="font-bold">접근 경고</span>
                            <ul className="mt-1.5 list-disc list-inside">
                                <li className="pl-2">
                                    마상소프트 사무실에서만 사용해야 합니다.
                                </li>
                                <li className="pl-2">
                                    마상소프트 사무실이 아니라면 접근을 중지해
                                    주세요.
                                </li>
                            </ul>
                        </div>
                    </header>

                    <main className="text-center item-center py-8">
                        {auth.user ? (
                            <div className="">
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        ) : (
                            <div className="">
                                <Link
                                    href="#"
                                    className="bg-gray-200 hover:bg-gray-300 py-2 px-3 text-gray-800 rounded transition-all mr-2"
                                >
                                    거절
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="bg-gray-800 hover:bg-gray-700 py-2 px-3 text-gray-800 rounded transition-all text-white"
                                >
                                    동의
                                </Link>
                            </div>
                        )}
                    </main>

                    <footer className="text-center text-gray-400 text-sm p-1 bg-gray-200">
                        controller hub
                    </footer>
                </div>
            </div>
        </>
    );
}

import React from "react";
import { Link } from "@inertiajs/react";

function Default({ code = 404, message = "페이지를 찾을수 없습니다." }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">{code}</h1>
                <p className="text-xl font-light text-gray-600 mt-4">
                    {message}
                </p>
                <Link
                    href={route("dashboard")}
                    className="inline-block bg-gray-200 hover:bg-gray-300 py-2 px-4 mt-4 text-gray-800 rounded transition-all text-sm"
                >
                    대시보드로 돌아가기
                </Link>
            </div>
        </div>
    );
}

export default Default;

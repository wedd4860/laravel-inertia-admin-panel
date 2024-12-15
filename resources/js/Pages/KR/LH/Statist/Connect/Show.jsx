import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { format, parse } from "date-fns";
import { useState } from "react";

const Show = ({ auth, gameInfo, type, queryParams = null, errors }) => {
    queryParams = queryParams || {};
    const searchDateChanged = (name, value) => {
        const objDate = new Date(value);
        const strDate = format(objDate, "yyyy-MM-dd");
        if (strDate) {
            queryParams[name] = strDate;
        } else {
            delete queryParams[name];
        }
        router.get(
            route("kr.lh.statistics.connect.show", { type }),
            queryParams
        );
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="동시접속자 - show" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <div className="col-span-1">
                    <div>
                        <InputLabel htmlFor="search" value="확인할 접속 날짜" />
                        <DatePicker
                            id="search"
                            wrapperClassName="mt-1 w-72"
                            className="border-gray-300 w-full rounded-md text-sm leading-4"
                            selected={queryParams.search}
                            onChange={(date) =>
                                searchDateChanged("search", date)
                            }
                            dateFormat="yyyy-MM-dd"
                        />
                        <InputError message={errors.search} className="mt-2" />
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-3">
                {gameInfo.map((item, idx) => (
                    <div
                        key={idx}
                        className="rounded-lg shadow border cols-span-1"
                    >
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                                <tr className="text-nowrap text-center">
                                    <th className="px-3 py-3">
                                        <div className="min-w-24">
                                            월드 코드
                                        </div>
                                    </th>
                                    <th className="px-3 py-3">
                                        <div className="min-w-24">
                                            월드 (서버명:{item.server})
                                        </div>
                                    </th>
                                    <th className="px-3 py-3">
                                        <div className="min-w-24">
                                            접속자 (전체:{item.all}명)
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <thead className="uppercase border-b-2 border-gray-500"></thead>
                            <tbody>
                                {item.info.map((info) => (
                                    <tr key={info.code} className="border-b">
                                        <td className="px-3 py-2 text-center">
                                            {info.code}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {info.world}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {info.count}명
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;

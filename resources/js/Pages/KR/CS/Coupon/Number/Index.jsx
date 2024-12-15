import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, couponLog, success, queryParams = null  }) => {
    const { data, setData, post, errors, reset, processing } = useForm({});

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.coupon.number.index", queryParams));
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_column) {
            if (queryParams.order_type === "asc") {
                queryParams.order_type = "desc";
            } else {
                queryParams.order_type = "asc";
            }
        } else {
            queryParams.sort_column = name;
            queryParams.order_type = "asc";
        }
        router.get(route("kr.cs.coupon.number.index", queryParams));
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="쿠폰 사용 로그 - index" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-3">
                                    <div>회원 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>계정명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>이벤트 제목</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>쿠폰 번호</div>
                                </th>
                                <TableHeading
                                    name="reg_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                    className="px-3 py-3"
                                >
                                    <div>사용 시간</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div>Detail</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="회원 번호"
                                        defaultValue={queryParams.member_srl}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "member_srl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("member_srl", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="계정명"
                                        defaultValue={queryParams.user_id}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "user_id",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("user_id", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="이벤트 제목"
                                        defaultValue={queryParams.event_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "event_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("event_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="쿠폰 번호"
                                        defaultValue={queryParams.number_coupon}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "number_coupon",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("number_coupon", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {couponLog.data.map((item) => (
                                <tr key={item.member_srl} className="border-b">
                                    <td className="p-1 text-center">
                                        {item.member_srl}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.user_id}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.event_name}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.number_coupon}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.reg_date}
                                    </td>
                                    <td className="p-1 text-center">
                                        <Link
                                            href={route(
                                                "kr.cs.coupon.event.read",
                                                item.event_index
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            이벤트 상세
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={couponLog.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, members, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.mcoin.masang.index"), queryParams);
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
        router.get(route("kr.cs.mcoin.masang.index"), queryParams);
    };

    const handleLeaveMember = (iMemberSrl) => {
        setData("member_srl", iMemberSrl);
        openModal();
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="M코인조회 : 마상계정 - index" />

            <div className="p-6 overflow-hidden shadow-sm">
                <div className="overflow-y-auto rounded border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <TableHeading
                                    name="member_srl"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">회원번호</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">아이디</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">닉네임</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이메일 주소</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">휴대폰</div>
                                </th>
                                <TableHeading
                                    name="last_login"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-40">
                                        마지막 로그인
                                    </div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-80">action</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="member_srl"
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
                                        placeholder="user_id"
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
                                        placeholder="user_name"
                                        defaultValue={queryParams.user_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "user_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("user_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="nick_name"
                                        defaultValue={queryParams.nick_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "nick_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("nick_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="email_address"
                                        defaultValue={queryParams.email_address}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "email_address",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("email_address", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.data.map((item) => (
                                <tr key={item.member_srl} className="border-b">
                                    <td className="px-3 py-2">
                                        {item.member_srl}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.user_id}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.user_name}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.nick_name}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.email_address}
                                    </td>
                                    <td className="px-3 py-2">{item.phone}</td>
                                    <td className="px-3 py-2 text-center">
                                        {item.last_login}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <Link
                                            href={route(
                                                "kr.cs.mcoin.masang.history.show",
                                                {
                                                    member: item.member_srl,
                                                    history: "balance",
                                                }
                                            )}
                                            className="border-0 bg-teal-500 hover:bg-teal-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm mr-1"
                                        >
                                            잔액조회
                                        </Link>
                                        <Link
                                            href={route(
                                                "kr.cs.mcoin.masang.history.show",
                                                {
                                                    member: item.member_srl,
                                                    history: "usage",
                                                }
                                            )}
                                            className="border-0 bg-rose-500 hover:bg-rose-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm mr-1"
                                        >
                                            사용내역
                                        </Link>
                                        <Link
                                            href={route(
                                                "kr.cs.mcoin.masang.history.show",
                                                {
                                                    member: item.member_srl,
                                                    history: "recharge",
                                                }
                                            )}
                                            className="border-0 bg-violet-500 hover:bg-violet-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm mr-1"
                                        >
                                            충전내역
                                        </Link>
                                        <Link
                                            href={route(
                                                "kr.cs.mcoin.masang.history.show",
                                                {
                                                    member: item.member_srl,
                                                    history: "gift",
                                                }
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            선물내역
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={members.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

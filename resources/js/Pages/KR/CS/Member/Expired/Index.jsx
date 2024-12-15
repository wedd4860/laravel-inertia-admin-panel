import { ListOnToast } from "@/Components/ListOnToast";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, members, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.member.expired.index"), queryParams);
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
        router.get(route("kr.cs.member.expired.index"), queryParams);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="계정조회 : 휴먼계정 - index" />

            <div className="p-6 overflow-hidden shadow-sm">
                <div className="overflow-auto rounded border">
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
                                    <div className="min-w-24">생일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">상태</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">휴대폰</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="w-32">
                                        <div className="min-w-24">제한일</div>
                                    </div>
                                </th>
                                <TableHeading
                                    name="regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">가입일</div>
                                </TableHeading>
                                <TableHeading
                                    name="last_login"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">
                                        마지막 로그인
                                    </div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="w-24">본인인증</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="w-24">Actions</div>
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
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.denied}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "denied",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="N">승인</option>
                                        <option value="Y">거절</option>
                                    </SelectInput>
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
                                    <td className="px-3 py-2">
                                        {item.birthday}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.denied == "N" ? "승인" : "거절"}
                                    </td>
                                    <td className="px-3 py-2">{item.phone}</td>
                                    <td className="px-3 py-2">
                                        {item.limit_date}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.regdate}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.last_login}
                                    </td>
                                    <td className="px-3 py-2">{item.auth}</td>
                                    <td className="px-3 py-2 text-center">
                                        <Link
                                            href={route(
                                                "kr.cs.member.expired.edit",
                                                item.member_srl
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            수정
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

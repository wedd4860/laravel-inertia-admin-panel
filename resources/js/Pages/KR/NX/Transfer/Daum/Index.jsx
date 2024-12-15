import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/NX/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, transfers, queryParams = null, success }) => {
    const {
        data,
        setData,
        errors,
        reset,
        processing,
    } = useForm();
    queryParams = queryParams || {};

    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.nx.transfer.daum.index"), queryParams);
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
        router.get(route("kr.nx.transfer.daum.index"), queryParams);
    };

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="이관 신청 관리 : 다음 채널링 이관 - index" />

            <div className="p-6 overflow-hidden shadow-sm">
                <Toast
                    show={toastShow}
                    className="bg-yellow-50 border border-yellow-300 text-yellow-800 py-2 px-4 mb-4 flex justify-between items-center"
                >
                    <span>{msgToast}</span>
                    <button onClick={closeToast} className="ml-auto p-1">
                        &times;
                    </button>
                </Toast>

                <div className="overflow-auto rounded border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-3">
                                    <div className="min-w-24">DAUM 계정 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">DAUM 계정명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이관받을 계정 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이관받을 계정명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">유저 이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이메일</div>
                                </th>
                                <TableHeading
                                    name="reg_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">이관 신청 시간</div>
                                </TableHeading>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="DAUM 계정 번호 검색"
                                        defaultValue={queryParams.DaumMemberSrl}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "DaumMemberSrl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("DaumMemberSrl", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="DAUM 계정명 검색"
                                        defaultValue={queryParams.DaumID}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "DaumID",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("DaumID", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="마상 계정 번호 검색"
                                        defaultValue={queryParams.MasangMemberSrl}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "MasangMemberSrl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("MasangMemberSrl", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="마상 계정명 검색"
                                        defaultValue={queryParams.MasangID}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "MasangID",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("MasangID", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="유저 이름 검색"
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
                                        placeholder="이메일 검색"
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
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2">
                                        {item.DaumMemberSrl}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.DaumID}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.MasangMemberSrl}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.MasangID}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member
                                            ? item.member.user_name
                                            : "매칭 데이터 없음"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member
                                            ? item.member.email_address
                                            : "매칭 데이터 없음"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.reg_date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={transfers.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

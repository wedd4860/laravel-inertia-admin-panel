import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, hacks, queryParams = null, success }) => {
    const {
        data,
        setData,
        delete: destroy,
        errors,
        reset,
        processing,
    } = useForm();
    queryParams = queryParams || {};

    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);
    const [memberSrl, setMemberSrl] = useState(null);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.block.hacked.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const handleHackedDelete = (iMemberSrl) => {
        setMemberSrl(iMemberSrl);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        destroy(route("kr.cs.block.hacked.destroy", memberSrl), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                if (props.success != "") {
                    setMsgToast(props.success);
                    openToast();
                }
            },
            onError: (errors) => {
                console.log("errors");
            },
        });
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
            <Head title="차단관리 : 해킹계정차단 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.cs.block.hacked.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    차단계정 추가
                </Link>
            </div>

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
                                    <div className="min-w-24">member_srl</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">user_id</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">user_name</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">nick_name</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        email_address
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">text</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">regdate</div>
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
                                        placeholder="member_srl 검색"
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
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hacks.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2">
                                        {item.member_srl}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member
                                            ? item.member.user_id
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member
                                            ? item.member.user_name
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member
                                            ? item.member.nick_name
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member
                                            ? item.member.email_address
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-2">{item.text}</td>
                                    <td className="px-3 py-2">
                                        {item.regdate || "-"}
                                    </td>
                                    <td className="text-center">
                                        <Link
                                            href={route(
                                                "kr.cs.block.hacked.edit",
                                                item.member_srl
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-white text-sm inline-block"
                                        >
                                            수정
                                        </Link>
                                        <button
                                            className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            onClick={() =>
                                                handleHackedDelete(
                                                    item.member_srl
                                                )
                                            }
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={hacks.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        해킹계정정보 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 계정의 정보를 삭제하려고 합니다.
                        <br />
                        계속하시겠습니까?
                    </p>
                    <div className="mt-3 flex justify-end">
                        <button
                            className="mr-1 border-0 bg-gray-200 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all text-sm"
                            onClick={closeModal}
                        >
                            취소
                        </button>
                        <form onSubmit={onSubmit}>
                            <button
                                type="submit"
                                className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                onClick={closeModal}
                                disabled={processing}
                            >
                                삭제
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

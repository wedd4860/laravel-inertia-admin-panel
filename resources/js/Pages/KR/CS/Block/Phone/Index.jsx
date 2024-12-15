import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, phones, queryParams = null, success }) => {
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
    const [seq, setSeq] = useState();

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.block.phone.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const handlePhoneDelete = (iSeq) => {
        setSeq(iSeq);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!seq) {
            return false;
        }
        destroy(route("kr.cs.block.phone.destroy", seq), {
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
            <Head title="차단관리 : 전화번호차단 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.cs.block.phone.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    차단 전화번호 추가
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
                                    <div className="min-w-24">등록번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">전화번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">차단일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="w-full">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <td className="px-3 py-2"></td>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="전화번호 검색"
                                        defaultValue={queryParams.phone}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("phone", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {phones.data.map((item) => (
                                <tr key={item.seq} className="border-b">
                                    <td className="px-3 py-2">{item.seq}</td>
                                    <td className="px-3 py-2">{item.phone}</td>
                                    <td className="px-3 py-2">
                                        {item.regDate}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            onClick={() =>
                                                handlePhoneDelete(item.seq)
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
                    links={phones.meta.links}
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

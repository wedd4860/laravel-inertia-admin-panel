import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, launchers, queryParams = null, success }) => {
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
    const [launcherType, setLauncherType] = useState(null);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.link.launcher.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const handleLauncherDelete = (iType) => {
        setLauncherType(iType);
        openModal();
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
        router.get(route("kr.cs.link.launcher.index"), queryParams);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!launcherType) {
            return false;
        }
        destroy(
            route("kr.cs.link.launcher.destroy", { launcherSeq: launcherType }),
            {
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
            }
        );
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
            <Head title="링크관리 : 마상소프트런처 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.cs.link.launcher.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    런처링크 추가
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
                                <TableHeading
                                    name="type"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">링크타입</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">url</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">버전</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">비고</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">등록일</div>
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
                                        placeholder="type 검색"
                                        defaultValue={queryParams.type}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "type",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("type", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {launchers.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.type}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.launcher}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.version}
                                    </td>
                                    <td className="px-3 py-2">{item.text}</td>
                                    <td className="px-3 py-2">
                                        {item.regdate}
                                    </td>
                                    <td className="text-center">
                                        <Link
                                            href={route(
                                                "kr.cs.link.launcher.edit",
                                                item.type
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-white text-sm inline-block"
                                        >
                                            수정
                                        </Link>
                                        <button
                                            className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            onClick={() =>
                                                handleLauncherDelete(item.type)
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
                    links={launchers.meta.links}
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

import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, transfer, queryParams = null, success }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({
        lg_web_no: null,
        lg_web_id: null,
        ms_id: null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);
    const [retryModalShow, setRetryModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const searchFieldChanged = (name, value) => {
        value = value.trim();
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.user.transfer.index"), queryParams);
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
        router.get(route("kr.lh.user.transfer.index"), queryParams);
    };

    const handleEvent = (data, strAction) => {
        if (strAction == "retry") {
            setData({
                lg_web_no: data.lg_web_no,
                lg_web_id:  data.lg_web_id,
                ms_id:  data.ms_id,
            });
        } else if (strAction == "delete") {
            setData("lg_web_id", data.lg_web_id);
        }
        openModal(strAction);
    };

    const onSubmit = (value) => (e) => {
        e.preventDefault();
        closeModal();
        if (value == "retry") {
            if (!data.lg_web_no || !data.lg_web_id || !data.ms_id) {
                return false;
            }
            patch(
                route("kr.lh.user.transfer.update",
                    [
                        data.lg_web_no,
                        data.lg_web_id,
                        data.ms_id,
                    ]
                ),
                {
                    preserveScroll: true,
                    onSuccess: ({ props }) => {
                        setMsgToast(props.success);
                        openToast();
                    },
                    onError: (errors) => {
                        console.log("errors");
                    },
                }
            );
            return;
        } else if (value == "delete") {
            if (!data.lg_web_id) {
                return false;
            }
            destroy(route("kr.lh.user.transfer.destroy", data.lg_web_id), {
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
            return;
        }
        return;
    };

    const openToast = () => {
        setToastShow(true);
    };
    const closeToast = () => {
        setToastShow(false);
    };
    const openModal = (strAction) => {
        if (strAction == "retry") {
            setRetryModalShow(true);
        } else if (strAction == "delete") {
            setDeleteModalShow(true);
        }
        setModalShow(true);
    };
    const closeModal = () => {
        setModalShow(false);
        setRetryModalShow(false);
        setDeleteModalShow(false);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="회원 관리 : 이관 현황 관리 - index" />
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
                                    <div className="min-w-24">
                                        바른손 계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        바른손 계정명
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">마상 계정명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">닉네임</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">생년월일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">에러코드</div>
                                </th>
                                <TableHeading
                                    name="regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">등록일</div>
                                </TableHeading>
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
                                        type="number"
                                        placeholder="바른손 계정 번호"
                                        defaultValue={queryParams.lg_web_no}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "lg_web_no",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("lg_web_no", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="바른손 계정명"
                                        defaultValue={queryParams.lg_web_id}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "lg_web_id",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("lg_web_id", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="마상 계정명"
                                        defaultValue={queryParams.ms_id}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ms_id",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("ms_id", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="이름"
                                        defaultValue={queryParams.ms_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ms_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("ms_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="닉네임"
                                        defaultValue={queryParams.ms_nickname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ms_nickname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("ms_nickname", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.error}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "error",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">전체</option>
                                        <option value="0">성공</option>
                                        <option value="-1">실패</option>
                                    </SelectInput>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfer.data.map((item) => (
                                <tr key={item.idx} className="border-b">
                                    <td className="px-3 py-2">
                                        {item.lg_web_no}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.lg_web_id}
                                    </td>
                                    <td className="px-3 py-2 truncate">
                                        {item.ms_id}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.ms_name}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.ms_nickname}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.birthday}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.error == 0 ? "성공" : item.error}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.regdate}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.error != 0 ? (
                                            <button
                                                onClick={() =>
                                                    // handleDelete(item.lg_web_id)
                                                    handleEvent(
                                                        {
                                                            lg_web_no: item.lg_web_no,
                                                            lg_web_id: item.lg_web_id,
                                                            ms_id: item.ms_id,
                                                        },
                                                        "retry"
                                                    )
                                                }
                                                className="mr-1 float-left border-0 bg-green-500 hover:bg-green-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            >
                                                이관 재시도
                                            </button>
                                        ) : null }
                                        {item.error != 0 && item.isWebUser == 0 ? (
                                            <button
                                                onClick={() =>
                                                    handleEvent(
                                                        {
                                                            lg_web_id: item.lg_web_id,
                                                        },
                                                        "delete"
                                                    )
                                                }
                                                className="float-right border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            >
                                                삭제
                                            </button>
                                        ) : null }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={transfer.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                {retryModalShow && (
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            계정 이관 재시도
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            해당 계정 이관을 다시 시도합니다.
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
                            <form onSubmit={onSubmit("retry")}>
                                <button
                                    type="submit"
                                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                    // onClick={closeModal}
                                    disabled={processing}
                                >
                                    확인
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {deleteModalShow && (
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            이관 정보 삭제
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            해당 이관 정보를 삭제합니다.
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
                            <form onSubmit={onSubmit("delete")}>
                                <button
                                    type="submit"
                                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                    // onClick={closeModal}
                                    disabled={processing}
                                >
                                    확인
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

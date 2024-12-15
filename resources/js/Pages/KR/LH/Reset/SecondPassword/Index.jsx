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

const Index = ({ auth, lhUser, queryParams = null, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        memberSrl: null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);

    const searchFieldChanged = (name, value) => {
        value = value.trim();
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.reset.second.password.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const handleUpdateSecondPassword = (iMemberSrl) => {
        setData("memberSrl", iMemberSrl);
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
        router.get(route("kr.lh.reset.second.password.index"), queryParams);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!data.memberSrl) {
            return false;
        }
        patch(route("kr.lh.reset.second.password.update", data.memberSrl), {
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
            <Head title="초기화 관리 : 2차 비밀번호 초기화 - index" />
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
                                    name="lpu_idx"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">index</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">마상 no</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">닉네임</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">가입일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="마상 no"
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
                                        placeholder="닉네임"
                                        defaultValue={queryParams.nickname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "nickname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("nickname", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lhUser.data.map((item) => (
                                <tr
                                    key={item.user_code}
                                    className="border-b text-center"
                                >
                                    <td className="px-3 py-2 text-center">
                                        {item.user_code}
                                    </td>
                                    <td className="px-3 py-2 max-w-32 truncate text-left">
                                        {item.user_id}
                                    </td>
                                    <td className="px-3 py-2 max-w-32 truncate">
                                        {item.nickname || "-"}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.create_date}
                                    </td>
                                    <td className="px-3 py-2">
                                        <button
                                            onClick={() =>
                                                handleUpdateSecondPassword(
                                                    item.user_id
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-white text-sm"
                                        >
                                            초기화
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={lhUser.meta.links}
                    queryParams={queryParams}
                />

                <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            초기화
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            2차 비밀번호를 초기화 합니다.
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
                                    확인
                                </button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

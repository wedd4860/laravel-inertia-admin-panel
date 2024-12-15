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

const Index = ({ auth, accounts, queryParams = null, success }) => {
    const { data, setData, errors, reset, patch, processing } = useForm({
        user_id: null,
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
        router.get(route("kr.lh.user.oldaccount.index"), queryParams);
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
        router.get(route("kr.lh.user.oldaccount.index"), queryParams);
    };

    const handleEvent = (user_id) => {
        setData("user_id", user_id);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.user_id) {
            return false;
        }
        patch(route("kr.lh.user.oldaccount.update", data.user_id), {
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

    const openToast = () => {
        setToastShow(true);
    };
    const closeToast = () => {
        setToastShow(false);
    };
    const openModal = () => {
        setModalShow(true);
    };
    const closeModal = () => {
        setModalShow(false);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="회원 관리 : 바른손 계정 관리 - index" />
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
                                    name="user_code"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">바른손 계정번호</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">바른손 계정명</div>
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
                                    <div className="min-w-24">이메일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="w-24">Action</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="바른손 계정번호"
                                        defaultValue={queryParams.user_code}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "user_code",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("user_code", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="바른손 계정명"
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
                                        placeholder="이름"
                                        defaultValue={queryParams.name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="생년월일"
                                        defaultValue={queryParams.birth}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "birth",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("birth", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="이메일"
                                        defaultValue={queryParams.email}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("email", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.data.map((item) => (
                                <tr key={item.idx} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.user_code}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 text-center">
                                        {item.user_id}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.nickname}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.birth}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.email}
                                    </td>
                                    <td className="px-3 py-2">
                                        <button
                                            onClick={() =>
                                                handleEvent(item.user_id)
                                            }
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            암호 초기화
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={accounts.meta.links}
                    queryParams={queryParams}
                />
            </div>
            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        바른손 계정 비번 초기화
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 바른손 계정의 비밀번호를 초기화합니다.
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
                                className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                onClick={closeModal}
                                disabled={processing}
                            >
                                확인
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

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

const Index = ({ auth, members, queryParams = null, success }) => {
    const {
        data,
        setData,
        delete: destroy,
        errors,
        reset,
        processing,
    } = useForm({
        ID: null,
    });

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
        router.get(route("kr.cs.member.test.index"), queryParams);
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
        router.get(route("kr.cs.member.test.index"), queryParams);
    };

    const handleTestAccountDelete = (iId) => {
        setData("ID", iId);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.ID) {
            return false;
        }
        destroy(route("kr.cs.member.test.destroy", data.ID), {
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
            <Head title="계정조회 : 테스트계정 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.cs.member.test.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    테스트계정 생성
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
                                    <div className="min-w-24">계정 id</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">닉네임</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">생년월일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">사용목적</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">생성자</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">ip</div>
                                </th>
                                <TableHeading
                                    name="regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">regdate</div>
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
                                        placeholder="테스트계정"
                                        defaultValue={queryParams.ID}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ID",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) => onKeyPress("ID", e)}
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
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="생년월일"
                                        defaultValue={queryParams.birthdate}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "birthdate",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("birthdate", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="사용목적"
                                        defaultValue={queryParams.txt}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "txt",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) => onKeyPress("txt", e)}
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="생성자"
                                        defaultValue={queryParams.creator_id}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "creator_id",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("creator_id", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="IP"
                                        defaultValue={queryParams.ip}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ip",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) => onKeyPress("ip", e)}
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.data.map((item) => (
                                <tr key={item.ID} className="border-b">
                                    <td className="px-3 py-2">{item.ID}</td>
                                    <td className="px-3 py-2">
                                        {item.nickname}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.birthdate}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.txt}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.creator_id}
                                    </td>
                                    <td className="px-3 py-2">{item.ip}</td>
                                    <td className="px-3 py-2">
                                        {item.regdate}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <Link
                                            href={route(
                                                "kr.cs.member.test.edit",
                                                { testId: item.ID }
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-white text-sm inline-block"
                                        >
                                            수정
                                        </Link>
                                        <button
                                            className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            onClick={() =>
                                                handleTestAccountDelete(item.ID)
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
                    links={members.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        테스트계정 삭제
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

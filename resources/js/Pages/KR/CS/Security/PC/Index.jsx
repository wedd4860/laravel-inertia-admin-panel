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
    const {
        data,
        setData,
        delete: destroy,
        errors,
        reset,
        processing,
    } = useForm();

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [memberSrl, setMemberSrl] = useState();
    const [pcname, setPcname] = useState();

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.security.pc.index"), queryParams);
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
        router.get(route("kr.cs.security.pc.index"), queryParams);
    };

    const handleDeleteSecurity = (iMemberSrl, strPcName) => {
        setMemberSrl(iMemberSrl);
        setPcname(strPcName);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!memberSrl || !pcname) {
            return false;
        }
        destroy(route("kr.cs.security.pc.destroy", { memberSrl, pcname }), {
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
            <Head title="고객보안관리 : 지정 PC - index" />

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
                                    <div className="min-w-16">회원번호</div>
                                </th>
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
                                    <div className="min-w-24">pc 이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">macaddress</div>
                                </th>
                                <TableHeading
                                    name="regDate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">등록일</div>
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
                                        placeholder="memberSrl"
                                        defaultValue={queryParams.memberSrl}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "memberSrl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("memberSrl", e)
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
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="pcname"
                                        defaultValue={queryParams.pcname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "pcname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("pcname", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2">
                                        {item.memberSrl}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member.user_id ?? "-"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member.user_name ?? "-"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member.nick_name ?? "-"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.member.email_address ?? "-"}
                                    </td>
                                    <td className="px-3 py-2">{item.pcname}</td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.macaddress}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.regDate ?? "-"}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <button
                                            onClick={() =>
                                                handleDeleteSecurity(
                                                    item.memberSrl,
                                                    item.pcname
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-white text-sm"
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
                        지정 PC 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 지정 PC 정보를 삭제하려고 합니다.
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

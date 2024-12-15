import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/MSPC/AuthenticatedLayout";
import { KR_CREATOR_GROUP } from "@/Stores/Constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, groups, queryParams = null, success }) => {
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
    const aCreatorGroup = KR_CREATOR_GROUP;

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.mspc.creators.group.index"), queryParams);
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
        router.get(route("kr.cs.banner.main.index"), queryParams);
    };

    const handleDeleteGroup = (seq) => {
        setData("groupSeq", seq);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.groupSeq) {
            return false;
        }
        destroy(
            route("kr.mspc.creators.group.destroy", { groupSeq: data.groupSeq }),
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
            <Head title="크리에이터즈 조회 : 그룹 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.mspc.creators.group.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    그룹 추가
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
                                    <div className="min-w-3">순번</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">그룹이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">활동게임</div>
                                </th>
                                <TableHeading
                                    name="regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">
                                        코드 사용 종료 시간
                                    </div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-20">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="순번"
                                        defaultValue={queryParams.seq}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "seq",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) => onKeyPress("seq", e)}
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="그룹이름"
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
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.gameid}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "gameid",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        {aCreatorGroup.map((group) => (
                                            <option
                                                key={group.id}
                                                value={group.id}
                                            >
                                                {group.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.data.map((item) => (
                                <tr key={item.seq} className="border-b">
                                    <td className="px-3 py-2 w-20 text-center">
                                        {item.seq}
                                    </td>
                                    <td className="px-3 py-2">{item.name}</td>
                                    <td className="px-3 py-2 text-center w-56">
                                        {item.game_title}
                                    </td>
                                    <td className="px-3 py-2 text-center truncate w-56">
                                        {item.regdate}
                                    </td>
                                    <td className="px-3 py-2 text-center w-56">
                                        <Link
                                            href={route(
                                                "kr.mspc.creators.group.edit",
                                                item.seq
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
                    links={groups.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

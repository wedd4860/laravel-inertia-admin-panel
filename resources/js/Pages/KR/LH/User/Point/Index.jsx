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

const Index = ({ auth, point, queryParams = null, success }) => {
    const { data, setData, errors, reset, processing } = useForm({
        idx: null,
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
        router.get(route("kr.lh.user.point.index"), queryParams);
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
        router.get(route("kr.lh.user.point.index"), queryParams);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.idx) {
            return false;
        }
        destroy(route("kr.lh.user.point.destroy", data.idx), {
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
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="회원 관리 : 라그하임포인트(LP) - index" />
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
                                    <div className="min-w-24">바른손 no</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">마상 no 또는 id</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        라그하임포인트
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">수정일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="w-24">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="바른손 no"
                                        defaultValue={queryParams.lpu_user_idx}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "lpu_user_idx",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("lpu_user_idx", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="마상 no 또는 id"
                                        defaultValue={queryParams.lpu_user_idname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "lpu_user_idname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("lpu_user_idname", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {point.data.map((item) => (
                                <tr key={item.idx} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.lpu_idx}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.lpu_user_idx}
                                    </td>
                                    <td className="px-3 py-2 truncate">
                                        {item.lpu_user_idname}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.lpu_user_lag_point}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.lpu_update_date}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <Link
                                            href={route(
                                                "kr.lh.user.point.edit",
                                                item.lpu_idx
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
                    links={point.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

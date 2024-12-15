import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toast from "@/Components/Toast";
import { format, parse } from "date-fns";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, log, queryParams = null }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({});

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    console.log(log);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.rpcgame.index"), queryParams);
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
        router.get(route("kr.lh.log.rpcgame.index"), queryParams);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="로그 관리 : 가위바위보 로그 - index" />

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
                                    <div className="min-w-24">IDX</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">마상 계정번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">마상 계정명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">캐릭터 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">캐릭터명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-48">가위바위보 정보</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">게임 결과</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-72">보상 1</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">보상 2</div>
                                </th>
                                <TableHeading
                                    name="tgl_game_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-32">시간</div>
                                </TableHeading>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="마상 계정번호"
                                        defaultValue={queryParams.tgi_user_code}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "tgi_user_code",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("tgi_user_code", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="마상 계정명"
                                        defaultValue={queryParams.tgi_user_idname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "tgi_user_idname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("tgi_user_idname", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="캐릭터 번호"
                                        defaultValue={queryParams.tgi_char_code}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "tgi_char_code",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("tgi_char_code", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="캐릭터명"
                                        defaultValue={queryParams.tgi_char_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "tgi_char_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("tgi_char_name", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {log.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.tgl_idx}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgi_user_code}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgi_user_idname}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgi_char_code}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgi_char_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgl_game_result1}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgl_game_result2}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgl_purchase_item}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgl_purchase_item2}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.tgl_game_date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={log.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

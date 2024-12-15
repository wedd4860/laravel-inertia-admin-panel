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

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.gamestart.index"), queryParams);
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
        router.get(route("kr.lh.log.gamestart.index"), queryParams);
    };

    const searchDateChanged = (name, value) => {
        const objDate = value ? new Date(value) : null;
        const strDate = objDate ? format(objDate, "yyyy-MM-dd") : null;
        if (strDate) {
            queryParams[name] = strDate;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.gamestart.index"), queryParams);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="로그 관리 : 게임스타트 로그 - index" />

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
                                    <div className="min-w-24">서버타입</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">계정번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">유저 IP</div>
                                </th>
                                <TableHeading
                                    name="regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">등록일</div>
                                </TableHeading>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="서버타입"
                                        defaultValue={queryParams.gubun}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "gubun",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("gubun", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="마상계정번호"
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
                                        type="text"
                                        placeholder="유저 IP"
                                        defaultValue={queryParams.ipaddress}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ipaddress",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("ipaddress", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <DatePicker
                                        id="selectStart"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 min-w-8 w-2/5"
                                        enableTabLoop={false}
                                        className="mt-1 w-full rounded-md shadow-sm border-gray-300 text-sm leading-4"
                                        selected={queryParams.selectStart}
                                        onChange={(date) =>
                                            searchDateChanged(
                                                "selectStart",
                                                date
                                            )
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />{" "}
                                    ~
                                    <DatePicker
                                        id="selectEnd"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 min-w-8 w-2/5"
                                        enableTabLoop={false}
                                        className="mt-1 w-full rounded-md shadow-sm border-gray-300 text-sm leading-4"
                                        selected={queryParams.selectEnd}
                                        onChange={(date) =>
                                            searchDateChanged("selectEnd", date)
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {log.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.gubun}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.memberSrl}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.ipaddress}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.regdate}
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

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

const Index = ({ auth, cashItemLog, queryParams = null }) => {
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
        router.get(route("kr.lh.log.cash.index"), queryParams);
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
        router.get(route("kr.lh.log.cash.index"), queryParams);
    };

    const searchDateChanged = (name, value) => {
        const objDate = value ? new Date(value) : null;
        const strDate = objDate ? format(objDate, "yyyy-MM-dd") : null;
        if (strDate) {
            queryParams[name] = strDate;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.cash.index"), queryParams);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="로그 관리 : 캐시 아이템 구매 로그 - index" />

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
                                        계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        계정명
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">사이트 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">상품 코드</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">갯수</div>
                                </th>
                                <TableHeading
                                    name="amtPay"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">가격</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">유저 IP</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">서버 IP</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">빌링주문번호</div>
                                </th>
                                <TableHeading
                                    name="ret_code"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">결과코드</div>
                                </TableHeading>
                                <TableHeading
                                    name="regDate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">REGDATE</div>
                                </TableHeading>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="마상 계정 번호"
                                        defaultValue={queryParams.noUser}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "noUser",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("noUser", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="마상 계정명"
                                        defaultValue={queryParams.userID}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "userID",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("userID", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="상품 번호"
                                        defaultValue={queryParams.noGood}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "noGood",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("noGood", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="유저 IP"
                                        defaultValue={queryParams.ipUser}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ipUser",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("ipUser", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="빌링 결과 코드"
                                        defaultValue={queryParams.ret_code}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ret_code",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("ret_code", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <DatePicker
                                        id="selectStartDate"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 min-w-8 w-2/5"
                                        enableTabLoop={false}
                                        className="mt-1 w-full rounded-md shadow-sm border-gray-300 text-sm leading-4"
                                        selected={queryParams.selectStartDate}
                                        onChange={(date) =>
                                            searchDateChanged(
                                                "selectStartDate",
                                                date
                                            )
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />{" "}
                                    ~
                                    <DatePicker
                                        id="selectEndDate"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 min-w-8 w-2/5"
                                        enableTabLoop={false}
                                        className="mt-1 w-full rounded-md shadow-sm border-gray-300 text-sm leading-4"
                                        selected={queryParams.selectEndDate}
                                        onChange={(date) =>
                                            searchDateChanged(
                                                "selectEndDate",
                                                date
                                            )
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cashItemLog.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.noUser}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.userID}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.noSite}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.noGood}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.cntGood}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.amtPay}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.ipUser}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.ipServer}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.txtBxaid}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.ret_code}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.regDate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={cashItemLog.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

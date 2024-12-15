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

const Index = ({ auth, ingameLog, queryParams = null }) => {
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
        router.get(route("kr.lh.log.ingame.index"), queryParams);
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
        router.get(route("kr.lh.log.ingame.index"), queryParams);
    };

    const searchDateChanged = (name, value) => {
        const objDate = value ? new Date(value) : null;
        const strDate = objDate ? format(objDate, "yyyy-MM-dd") : null;
        if (strDate) {
            queryParams[name] = strDate;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.ingame.index"), queryParams);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="로그 관리 : 인게임 캐시 보관함 로그 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <span className="pr-6">
                    마상 계정명
                </span>
                <TextInput
                    className="w-1/3 text-sm leading-4"
                    type="text"
                    placeholder="마상 계정명으로 검색"
                    defaultValue={queryParams.user_id}
                    onKeyPress={(e) =>
                        onKeyPress("user_id", e)
                    }
                />
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
                                    <div className="min-w-24">라그하임 유저 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">아이템 코드</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">갯수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">남은 갯수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">사용 여부</div>
                                </th>
                                <TableHeading
                                    name="egoods_create_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">구매 날짜</div>
                                </TableHeading>
                                <TableHeading
                                    name="egoods_use_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">사용 날짜</div>
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
                                        placeholder="아이템 코드"
                                        defaultValue={queryParams.egoods_item_no}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "egoods_item_no",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("egoods_item_no", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={
                                            queryParams.egoods_enable
                                        }
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "egoods_enable",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">전체</option>
                                        <option value="1">미사용</option>
                                        <option value="0">사용</option>
                                    </SelectInput>
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
                            {ingameLog.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.egoods_user_code}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.egoods_item_no}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.egoods_org_cnt}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.egoods_cnt}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.egoods_enable}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.egoods_create_date}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.egoods_use_date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={ingameLog.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

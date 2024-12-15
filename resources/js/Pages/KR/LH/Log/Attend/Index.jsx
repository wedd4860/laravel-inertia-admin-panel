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

const Index = ({ auth, attendTableName, attendLog, queryParams = null }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const searchFieldChanged = (name, value) => {
        if(name == 'selectTableName'){
            queryParams = {};
        }

        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.attend.index"), queryParams);
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
        router.get(route("kr.lh.log.attend.index"), queryParams);
    };

    const searchDateChanged = (name, value) => {
        const objDate = value ? new Date(value) : null;
        const strDate = objDate ? format(objDate, "yyyy-MM-dd") : null;
        if (strDate) {
            queryParams[name] = strDate;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.attend.index"), queryParams);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="로그 관리 : 상시 출석 체크 로그 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <span className="pr-6">
                    로그 선택
                </span>
                <SelectInput
                    className="min-w-24 text-sm leading-4"
                    defaultValue={queryParams.selectTableName}
                    onChange={(e) =>
                        searchFieldChanged(
                            "selectTableName",
                            e.target.value
                        )
                    }
                >
                    <option value="">현재</option>
                    {attendTableName.map((name) => (
                        <option
                            key={name.tableName}
                            value={name.tableName}
                        >
                            {name.tableName}
                        </option>
                    ))}
                </SelectInput>
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
                                    <div className="min-w-3">INDEX</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">마상 계정명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">마상 계정 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">라그하임 유저 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">보상 순번</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">보상 아이템 코드</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">보상 아이템 갯수</div>
                                </th>
                                <TableHeading
                                    name="regdate"
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
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="마상 계정명"
                                        defaultValue={queryParams.masangId}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "masangId",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("masangId", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="마상 계정 번호"
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
                                        type="number"
                                        placeholder="라그하임 유저 번호"
                                        defaultValue={queryParams.LagWebUserNo}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "LagWebUserNo",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("LagWebUserNo", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="보상 순번"
                                        defaultValue={queryParams.ItemNumber}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ItemNumber",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("ItemNumber", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <DatePicker
                                        id="selectStartDate"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 min-w-8"
                                        enableTabLoop={false}
                                        className="mt-1 w-full rounded-md shadow-sm border-gray-300 text-sm leading-4"
                                        selected={queryParams.selectStartDate}
                                        onChange={(date) =>
                                            searchDateChanged("selectStartDate", date)
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    /> ~
                                    <DatePicker
                                        id="selectEndDate"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 min-w-8"
                                        enableTabLoop={false}
                                        className="mt-1 w-full rounded-md shadow-sm border-gray-300 text-sm leading-4"
                                        selected={queryParams.selectEndDate}
                                        onChange={(date) =>
                                            searchDateChanged("selectEndDate", date)
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendLog.data.map((item) => (
                                <tr key={item.idx} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.idx}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.masangId}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.memberSrl}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.LagWebUserNo}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.ItemNumber}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.ItemCode}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.ItemCount}
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
                    links={attendLog.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toast from "@/Components/Toast";
import { format, parse } from "date-fns";
import { ko } from 'date-fns/locale/ko';
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
setDefaultLocale(ko);

const Index = ({ auth, moveLog, queryParams = null }) => {
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
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.move.index"), queryParams);
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
        router.get(route("kr.lh.log.move.index"), queryParams);
    };

    const searchDateChanged = (name, value) => {
        const objDate = value ? new Date(value) : null;
        const strDate = objDate ? format(objDate, "yyyy-MM-dd") : null;
        if (strDate) {
            queryParams[name] = strDate;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.log.move.index"), queryParams);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="로그 관리 : 계정이동권 사용 로그 - index" />

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
                                    <div className="min-w-3">
                                        전)마상 계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        전)통합 계정번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        전)라그하임 계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">
                                        전)캐릭터 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">
                                        후)마상 계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        후)통합 계정번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        후)라그하임 계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">
                                        후)캐릭터 번호
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">타입</div>
                                </th>
                                <TableHeading
                                    name="prh_modify_date"
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
                                        placeholder="이동 전 마상 계정 번호"
                                        defaultValue={queryParams.prh_modify_before_desc}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "prh_modify_before_desc",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("prh_modify_before_desc", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="이동 전 라그하임 계정 번호"
                                        defaultValue={queryParams.prh_th_user_lag_idx}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "prh_th_user_lag_idx",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("prh_th_user_lag_idx", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="이동 전 캐릭터 번호"
                                        defaultValue={queryParams.prh_th_user_idname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "prh_th_user_idname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("prh_th_user_idname", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="이동 후 마상 계정 번호"
                                        defaultValue={queryParams.prh_modify_after_desc}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "prh_modify_after_desc",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("prh_modify_after_desc", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="이동 후 라그하임 계정 번호"
                                        defaultValue={queryParams.prh_tar_user_lag_idx}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "prh_tar_user_lag_idx",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("prh_tar_user_lag_idx", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="text"
                                        placeholder="이동 후 캐릭터 번호"
                                        defaultValue={queryParams.prh_tar_user_idname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "prh_tar_user_idname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("prh_tar_user_idname", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <DatePicker
                                        id="selectStartDate"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 min-w-8 w-2/5"
                                        enableTabLoop={false}
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
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
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
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
                            {moveLog.data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_modify_before_desc}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_th_user_idx}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_th_user_lag_idx}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_th_user_idname}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_modify_after_desc}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_tar_user_idx}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_tar_user_lag_idx}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_tar_user_idname}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_event_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.prh_modify_date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={moveLog.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { KR_LH_EVENT_TYPE_GROUP } from "@/Stores/Constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, events, queryParams = null }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({
        event_index: null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const aEventTypeGroup = KR_LH_EVENT_TYPE_GROUP;

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.event.integration.manual.index"), queryParams);
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
        router.get(route("kr.lh.event.integration.manual.index"), queryParams);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="이벤트 관리 : 통합 이벤트 보상 수동 지급 - index" />

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
                                    <div className="min-w-3">이벤트 종류</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이벤트 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">이벤트 설명</div>
                                </th>
                                <TableHeading
                                    name="start_event"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.event_start}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">시작시간</div>
                                </TableHeading>
                                <TableHeading
                                    name="end_event"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.event_end}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">종료시간</div>
                                </TableHeading>
                                <TableHeading
                                    name="reg_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.regdate}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">생성일</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div>Action</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.event_type}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "event_type",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">전체</option>
                                        {aEventTypeGroup.map((group) => (
                                            <option
                                                key={group.id}
                                                value={group.id}
                                            >
                                                {group.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="이벤트 번호"
                                        defaultValue={queryParams.event_title}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "event_title",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("event_title", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="이벤트 설명"
                                        defaultValue={queryParams.event_description}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "event_description",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("event_description", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.data.map((item) => (
                                <tr key={item.event_index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.event_index}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {(()=> {
                                            switch(item.event_type){
                                                case "1" :
                                                    return "레벨 달성";
                                                case "2" :
                                                    return "출석 / 일일 보상";
                                                default :
                                                    return "-";
                                            }
                                        })()}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.event_title}
                                    </td>
                                    <td className="px-3 py-2  max-w-80 truncate">
                                        {item.event_description}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.event_start}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.event_end}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.regdate}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.event_type == 1 ? (
                                            <Link
                                                href={route(
                                                    "kr.lh.event.integration.manual.create",
                                                    item.event_index
                                                )}
                                            className="border-0 bg-fuchsia-500 hover:bg-fuchsia-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            >
                                            아이템 수동 지급
                                            </Link>
                                        ) : null }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={events.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

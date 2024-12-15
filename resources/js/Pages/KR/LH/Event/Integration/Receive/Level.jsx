import InputLabel from "@/Components/InputLabel";
import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Level = ({ auth, receiveLogs, event, queryParams = null }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({
        event_index: event.event_index,
        receive_index: null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleDelete = (iReceiveIndex) => {
        setData("receive_index", iReceiveIndex);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.event_index && !data.receive_index) {
            return false;
        }
        destroy(
            route("kr.lh.event.integration.receive.destroy", [
                data.event_index,
                data.receive_index,
            ]),
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

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(
            route("kr.lh.event.integration.receive.index", data.event_index),
            queryParams
        );
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
        router.get(
            route("kr.lh.event.integration.receive.index", data.event_index),
            queryParams
        );
    };

    const searchDateChanged = (name, value) => {
        const objDate = value ? new Date(value) : null;
        const strDate = objDate ? format(objDate, "yyyy-MM-dd") : null;
        if (strDate) {
            queryParams[name] = strDate;
        } else {
            delete queryParams[name];
        }
        router.get(
            route("kr.lh.event.integration.receive.index", data.event_index),
            queryParams
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
            <Head title="이벤트 관리 : 통합 이벤트 보상 수령 로그 목록 - index" />

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
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">이벤트 정보</p>
                    </div>
                    <div className="grid grid-cols-4 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_type"
                                    value="이벤트 종류"
                                />
                                레벨 달성
                                {/* {(() => {
                                    switch (event.event_type) {
                                        case "1":
                                            return "레벨 달성";
                                        case "2":
                                            return "출석 / 일일 보상";
                                        default:
                                            return "-";
                                    }
                                })()} */}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_title"
                                    value="이벤트 번호"
                                />
                                {event.event_title}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="event_description"
                                    value="이벤트 설명"
                                />
                                {event.event_description}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 text-right">
                    <Link
                        href={route("kr.lh.event.integration.management.index")}
                        className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
                    >
                        목록
                    </Link>
                </div>

                <div className="overflow-auto rounded border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-1">
                                    <div className="min-w-3">INDEX</div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        캐릭터 선택
                                        <br />
                                        INDEX
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-24">
                                        마상
                                        <br />
                                        계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        라그하임
                                        <br />
                                        계정 번호
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        라그하임
                                        <br />
                                        캐릭터 번호
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-20">서버</div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">캐릭터 명</div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        보상
                                        <br />
                                        INDEX
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        보상
                                        <br />
                                        아이템 코드
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        보상
                                        <br />
                                        아이템 갯수
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        보상
                                        <br />
                                        레벨 구간
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">
                                        지급 당시 레벨
                                    </div>
                                </th>
                                <th className="px-3 py-1">
                                    <div className="min-w-3">지급 상태</div>
                                </th>
                                <TableHeading
                                    name="receive_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-32">지급 시간</div>
                                </TableHeading>
                                <th className="px-3 py-1">
                                    <div>Action</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th></th>
                                <th className="px-3 py-1">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="캐릭터 선택 ID"
                                        min="0"
                                        defaultValue={queryParams.select_index}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "select_index",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("select_index", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-1">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="마상 계정 번호"
                                        min="0"
                                        defaultValue={
                                            queryParams.select_member_srl
                                        }
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "select_member_srl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("select_member_srl", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-1">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="라그하임 계정 번호"
                                        min="0"
                                        defaultValue={
                                            queryParams.select_lh_user_srl
                                        }
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "select_lh_user_srl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("select_lh_user_srl", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-1">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="라그하임 캐릭터 번호"
                                        min="0"
                                        defaultValue={
                                            queryParams.select_character_srl
                                        }
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "select_character_srl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress(
                                                "select_character_srl",
                                                e
                                            )
                                        }
                                    />
                                </th>
                                <th></th>
                                <th></th>
                                <th className="px-3 py-1">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="보상 ID"
                                        min="0"
                                        defaultValue={queryParams.reward_index}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "reward_index",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("reward_index", e)
                                        }
                                    />
                                </th>
                                <th></th>
                                <th></th>
                                <th className="px-3 py-1">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        type="number"
                                        placeholder="보상 레벨 구간"
                                        min="0"
                                        defaultValue={queryParams.reward_level}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "reward_level",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("reward_level", e)
                                        }
                                    />
                                </th>
                                <th></th>
                                <th className="px-3 py-1">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={
                                            queryParams.receive_completed
                                        }
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "receive_completed",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">전체</option>
                                        <option value="1">성공</option>
                                        <option value="0">실패</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <DatePicker
                                        id="selectStartDate"
                                        autoComplete="off"
                                        isClearable={true}
                                        wrapperClassName="mt-1 max-w-16"
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
                                        wrapperClassName="mt-1 max-w-16"
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
                            {receiveLogs.data.map((item) => (
                                <tr
                                    key={item.receive_index}
                                    className="border-b"
                                >
                                    <td className="px-3 py-1 text-center">
                                        {item.receive_index}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.select_index}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveSelect
                                            ? item.receiveSelect
                                                  .select_member_srl
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveSelect
                                            ? item.receiveSelect
                                                  .select_lh_user_srl
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveSelect
                                            ? item.receiveSelect
                                                  .select_character_srl
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveSelect
                                            ? item.receiveSelect.select_server_name
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveSelect
                                            ? item.receiveSelect
                                                  .select_character_name
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.reward_index}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveReward
                                            ? item.receiveReward
                                                  .reward_item_code
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveReward
                                            ? item.receiveReward.reward_count
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receiveReward
                                            ? item.receiveReward.reward_level
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receive_level}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receive_completed == 1
                                            ? "성공"
                                            : "실패"}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        {item.receive_date}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        <button
                                            onClick={() =>
                                                handleDelete(item.receive_index)
                                            }
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
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
                    links={receiveLogs.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        보상 수령 로그 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 보상 수령 로그를 삭제합니다.
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

export default Level;

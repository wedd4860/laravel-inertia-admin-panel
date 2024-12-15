import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Show = ({ auth, event, success }) => {
    const { data, setData, delete: destroy, post, errors, reset, processing } = useForm({
        event_index: event.event_index,
        reward_index: null,
    });

    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);

    const handleDelete = (iRewardIndex) => {
        setData("reward_index", iRewardIndex);
        openModal();
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

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.event_index && !data.reward_index) {
            return false;
        }
        destroy(route(
                "kr.lh.event.integration.reward.destroy",
                [
                    data.event_index,
                    data.reward_index,
                ]), {
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

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="이벤트 관리 : 통합 이벤트 정보 - read" />

            <div className="p-6 pb-1">
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
                        <div className="col-span-3">
                            <div>
                                <InputLabel
                                    htmlFor="event_index"
                                    value="INDEX"
                                />
                                {event.event_index}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_type"
                                    value="이벤트 종류"
                                />
                                {(()=> {
                                    switch(event.event_type){
                                        case "1" :
                                            return "레벨 달성";
                                        case "2" :
                                            return "출석 / 일일 보상";
                                        default :
                                            return "-";
                                    }
                                })()}
                            </div>
                        </div>
                        <div className="col-span-2">
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
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="event_start"
                                    value="이벤트 시작 시간"
                                />
                                {event.event_start}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="event_end"
                                    value="이벤트 종료 시간"
                                />
                                {event.event_end}
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
                    <Link
                        href={route(
                            "kr.lh.event.integration.management.edit",
                            [
                                event.event_index,
                            ]
                        )}
                        className="bg-sky-200 border-sky-200 border-2 hover:bg-sky-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
                    >
                        수정
                    </Link>
                </div>
            </div>

            <div className="p-6 pt-1">
                <div className="py-4 overflow-hidden shadow-sm">
                    <Link
                        href={route(
                            "kr.lh.event.integration.reward.create",
                            [
                                event.event_index,
                            ]
                        )}
                        className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                    >
                        이벤트 보상 추가
                    </Link>
                </div>
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">이벤트 보상 정보</p>
                    </div>
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-3">
                                    <div>보상 INDEX</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>
                                        {(()=> {
                                            switch(event.event_type){
                                                case "1" :
                                                    return "보상 수령 레벨";
                                                case "2" :
                                                    return "보상 지급 순번";
                                                default :
                                                    return "-";
                                            }
                                        })()}
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>아이템 코드</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>아이템 갯수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>아이템 이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>아이템 설명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>Action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {event.eventReward.map((item) => (
                                <tr
                                    key={item.reward_index}
                                    className="border-b"
                                >
                                    <td className="p-1 text-center">
                                        {item.reward_index}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.reward_level}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.reward_item_code}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.reward_count}
                                    </td>
                                    <td className="p-1 text-center max-w-80 truncate">
                                        {item.reward_name}
                                    </td>
                                    <td className="p-1 text-center max-w-80 truncate">
                                        {item.reward_description}
                                    </td>
                                    <td className="p-1 text-center">
                                        <Link
                                            href={route(
                                                "kr.lh.event.integration.reward.edit",
                                                [
                                                    item.event_index,
                                                    item.reward_index,
                                                ]
                                            )}
                                            className="mx-3 border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            수정
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.reward_index)
                                            }
                                            className="mx-3 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-white text-sm"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        보상 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 보상을 삭제합니다.
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

export default Show;

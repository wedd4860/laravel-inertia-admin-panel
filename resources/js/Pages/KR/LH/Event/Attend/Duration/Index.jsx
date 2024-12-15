import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Toast from "@/Components/Toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, eventTimeInfo, eventLogCount, success }) => {
    const { data, setData, post, patch, errors, reset, processing } = useForm({
        startDate: new Date(eventTimeInfo.startDate),
        endDate: new Date(eventTimeInfo.endDate),
    });

    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [resetModalShow, setResetModalShow] = useState(false);

    const onSubmit = (value) => (e) => {
        e.preventDefault();
        closeModal();

        if (value == "update") {
            patch(route("kr.lh.event.attend.duration.update"), {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    if (props.success) {
                        setMsgToast(props.success);
                        openToast();
                    }
                },
                onError: (errors) => {
                    console.log("errors");
                },
            });
            return;
        } else if (value == "reset") {
            post(route("kr.lh.event.attend.duration.reset"), {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    if (props.success) {
                        setMsgToast(props.success);
                        openToast();
                    }
                },
                onError: (errors) => {
                    console.log("errors");
                },
            });
            return;
        }
        return;
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };

    const handleSubmit = (strAction) => {
        openModal(strAction);
    };

    const openModal = (strAction) => {
        if (strAction == "update") {
            setUpdateModalShow(true);
        } else if (strAction == "reset") {
            setResetModalShow(true);
        }
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        setUpdateModalShow(false);
        setResetModalShow(false);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="이벤트 관리 : 상시 출석 설정 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <button
                    onClick={() => handleSubmit("reset")}
                    className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    출석 기록 초기화
                </button>
            </div>

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                이번 출석에 보상 지급된 횟수 : {eventLogCount}
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
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">상시 출석 기간 설정</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="startDate"
                                    value="출석체크 시작 날짜"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="startDate"
                                    value={data.startDate}
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.startDate}
                                    onChange={(date) =>
                                        setData("startDate", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.startDate}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="endDate"
                                    value="출석체크 종료 날짜"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="endDate"
                                    value={data.endDate}
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.endDate}
                                    onChange={(date) =>
                                        setData("endDate", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.endDate}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <button
                            type="submit"
                            onClick={() => handleSubmit("update")}
                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                        >
                            수정
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                {updateModalShow && (
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            상시 출석체크 날짜 수정
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            상시 출석체크 진행 날짜를 수정합니다.
                            <br />
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
                            <form onSubmit={onSubmit('update')}>
                                <button
                                    type="submit"
                                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                    disabled={processing}
                                >
                                    확인
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {resetModalShow && (
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            상시 출석 기록 초기화
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            상시 출석체크 기록을 초기화 하고 다시 시작합니다.
                            <br />
                            모든 유저가 1일차부터 다시 보상을 받을 수 있습니다.
                            <br />
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
                            <form onSubmit={onSubmit('reset')}>
                                <button
                                    type="submit"
                                    className="border-0 bg-blue-500 hover:bg-blue-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                    disabled={processing}
                                >
                                    종료
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

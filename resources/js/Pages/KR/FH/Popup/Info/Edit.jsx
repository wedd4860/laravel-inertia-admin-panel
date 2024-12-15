import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/FH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MemberGroupButton } from "@/Components/Member/MemberGroupButton";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";

const Edit = ({ auth, popup, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        imageUrl: popup.imageUrl,
        linkUrl: popup.linkUrl,
        status: popup.status,
        startDate: popup.startDate ? new Date(popup.startDate) : null,
        endDate: popup.endDate ? new Date(popup.endDate) : null,
    });
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.status) {
            return false;
        }
        patch(route("kr.fh.popup.info.update"), {
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
            <Head title="팝업 정보 : 출조낚시왕 팝업 - edit" />

            <div className="p-6">
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
                        <p className="font-bold">팝업 정보 변경</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                팝업 사용 상태:{" "}
                                <SelectInput
                                    className="text-sm leading-4"
                                    defaultValue={popup.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option className="text-blue-600" value="N">
                                        OFF
                                    </option>
                                    <option value="Y">ON</option>
                                </SelectInput>
                                <InputError
                                    message={errors.status}
                                    className="                                                                                                                                                                            mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                이미지 URL:{" "}
                                <TextInput
                                    className="w-7/12 text-sm leading-4"
                                    placeholder="이미지 URL"
                                    defaultValue={popup.imageUrl}
                                    onChange={(e) =>
                                        setData("imageUrl", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.imageUrl}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                링크 URL:{" "}
                                <TextInput
                                    className="w-7/12 text-sm leading-4"
                                    placeholder="링크 URL"
                                    defaultValue={popup.linkUrl}
                                    onChange={(e) =>
                                        setData("linkUrl", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.linkUrl}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                팝업 시작 일시:{" "}
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
                                팝업 종료 일시:{" "}
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
                                    message={errors.startDate}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <button
                            type="submit"
                            onClick={openModal}
                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                        >
                            수정
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        팝업 정보 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        팝업 정보를 수정합니다.
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
                                className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                onClick={closeModal}
                                disabled={processing}
                            >
                                확인
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Edit;

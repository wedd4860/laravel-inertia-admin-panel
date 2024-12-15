import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/GZ/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MemberGroupButton } from "@/Components/Member/MemberGroupButton";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";

const Show = ({ auth, link, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        idx: link.idx || null,
        imageTargetlink: link.imageTargetlink || null,
    });

    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.idx) {
            return false;
        }

        patch(route("kr.gz.link.download.update"), {
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
            <Head title="링크 관리 : 다운로드 링크 - show" />

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
                        <p className="font-bold">다운로드 링크</p>
                    </div>
                    <div className="grid grid-col-1 p-6 gap-4">
                        <div className="col-1">
                            <div>
                                <InputLabel
                                    htmlFor="imageTargetlink"
                                    value="링크 URL"
                                />
                                <TextInput
                                    id="imageTargetlink"
                                    type="url"
                                    name="imageTargetlink"
                                    value={data.imageTargetlink}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "imageTargetlink",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.imageTargetlink}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 border-t-2 flex justify-between">
                        <a
                            href={link.imageTargetlink}
                            target="_blank"
                            className="border-2 border-gray-300 hover:border-gray-200 bg-gray-300 hover:bg-gray-200 py-1 px-2 rounded transition-all text-black text-sm"
                        >
                            다운로드 테스트
                        </a>
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
                        다운로드 링크 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        클라이언트 다운로드 링크를 수정합니다.
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

export default Show;

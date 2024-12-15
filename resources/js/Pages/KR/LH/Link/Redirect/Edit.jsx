import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MemberGroupButton } from "@/Components/Member/MemberGroupButton";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";

const Show = ({ auth, intro, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        redirect_url: intro.redirect_url,
        on_off_swtich: intro.on_off_swtich,
    });
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.on_off_swtich) {
            return false;
        }
        patch(route("kr.lh.link.redirect.update"), {
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
            <Head title="인트로관리 리다이렉트 - edit" />

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
                        <p className="font-bold">리다이렉트 상태/URL 변경</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                리다이렉트 상태:{" "}
                                <SelectInput
                                    className="text-sm leading-4"
                                    defaultValue={intro.on_off_swtich}
                                    onChange={(e) =>
                                        setData("on_off_swtich", e.target.value)
                                    }
                                >
                                    <option className="text-blue-600" value="N">
                                        미작동
                                    </option>
                                    <option value="Y">작동</option>
                                </SelectInput>
                                <InputError
                                    message={errors.on_off_swtich}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                리다이렉트 URL:{" "}
                                <TextInput
                                    className="w-7/12 text-sm leading-4"
                                    placeholder="리다이렉트 URL"
                                    defaultValue={intro.redirect_url}
                                    onChange={(e) =>
                                        setData("redirect_url", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.redirect_url}
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
                        인트로관리 리다이렉트 상태/URL 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        리다이렉트 상태/URL을 수정합니다.
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

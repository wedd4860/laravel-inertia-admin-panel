import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MemberGroupButton } from "@/Components/Member/MemberGroupButton";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";

const Edit = ({ auth, member, success }) => {
    const { data, setData, put, errors, reset, processing } = useForm({
        ID: member.ID || null,
        birthdate: member.birthdate || null,
        creator_id: member.creator_id || null,
        phone: member.phone || null,
        ip: member.ip || null,
        nickname: member.nickname || null,
        regdate: member.regdate || null,
        txt: member.txt || null,
        pwd: member.pwd || null,
    });

    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.ID) {
            return false;
        }

        put(route("kr.cs.member.test.update", data.ID), {
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
            <Head title="계정조회 : 테스트계정 - edit" />

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
                        <p className="font-bold">{data.ID}</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="ID" />
                                <p className="ml-2">{data.ID}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="생성자" />
                                <p className="ml-2">{data.creator_id}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="생성일" />
                                <p className="ml-2">{data.regdate}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="IP" />
                                <p className="ml-2">{data.ip}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel htmlFor="nickname" value="닉네임" />
                                <TextInput
                                    id="nickname"
                                    type="text"
                                    name="nickname"
                                    value={data.nickname}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("nickname", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.nickname}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel htmlFor="pwd" value="비밀번호" />
                                <TextInput
                                    id="pwd"
                                    type="password"
                                    name="pwd"
                                    value={data.pwd}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("pwd", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.txt}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel htmlFor="txt" value="사용목적" />
                                <TextInput
                                    id="txt"
                                    type="text"
                                    name="txt"
                                    value={data.txt}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("txt", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.txt}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.cs.member.info.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-sm"
                        >
                            취소
                        </Link>
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
                        테스트계정 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 계정의 정보를 수정 하려고 합니다.
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

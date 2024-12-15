import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Toast from "@/Components/Toast";
import Modal from "@/Components/Modal";
import { useState } from "react";

const Edit = ({ auth, member }) => {
    const { data, setData, put, errors, reset, processing } = useForm({
        last_login: member.last_login || null,
        regdate: member.regdate || null,
        phone: member.phone || "-",
        member_srl: member.member_srl || null,
        user_name: member.user_name || null,
        nick_name: member.nick_name || null,
        birthday: member.birthday || null,
        email_address: member.email_address || null,
        denied: member.denied || "N",
        limit_date: member.limit_date || null,
        member_login_device_switch: member.member_login_device_switch
            ? member.member_login_device_switch.switch
            : "N",
        password: null,
    });

    const [msgToast, setMsgToast] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.member_srl) {
            return false;
        }

        put(route("kr.cs.member.expired.update", data.member_srl), {
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

    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

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
            <Head title="계정조회 : 마상계정 - edit" />

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
                    <form onSubmit={onSubmit}>
                        <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                            <p className="font-bold">{data.member_srl}</p>
                        </div>
                        <div className="grid grid-cols-2 p-6 gap-4">
                            <div className="col-span-1">
                                <div>
                                    <InputLabel value="유저번호" />
                                    <p className="ml-2">{data.member_srl}</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel value="휴대폰" />
                                    <p className="ml-2">{data.phone}</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel value="가입일" />
                                    <p className="ml-2">{data.regdate}</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel value="마지막 로그인" />
                                    <p className="ml-2">{data.last_login}</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel
                                        htmlFor="user_name"
                                        value="유저 이름"
                                    />
                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="user_name"
                                        value={data.user_name}
                                        className="mt-1 border-gray-300 w-full text-sm leading-4"
                                        onChange={(e) =>
                                            setData("user_name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.user_name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel
                                        htmlFor="nick_name"
                                        value="닉네임"
                                    />
                                    <TextInput
                                        id="nick_name"
                                        type="text"
                                        name="nick_name"
                                        value={data.nick_name}
                                        className="mt-1 border-gray-300 w-full text-sm leading-4"
                                        onChange={(e) =>
                                            setData("nick_name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.nick_name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel
                                        htmlFor="email_address"
                                        value="이메일"
                                    />
                                    <TextInput
                                        id="email_address"
                                        type="text"
                                        name="email_address"
                                        value={data.email_address}
                                        className="mt-1 border-gray-300 w-full text-sm leading-4"
                                        onChange={(e) =>
                                            setData(
                                                "email_address",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.email_address}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="비밀번호"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="비밀번호를 입력해 주세요."
                                        className="mt-1 border-gray-300 w-full text-sm leading-4"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel
                                        htmlFor="birthday"
                                        value="생일"
                                    />
                                    <DatePicker
                                        id="birthday"
                                        wrapperClassName="mt-1 w-full"
                                        className="border-gray-300 w-full rounded-md text-sm leading-4"
                                        selected={data.birthday}
                                        onChange={(date) =>
                                            setData("birthday", date)
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <InputError
                                        message={errors.birthday}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel
                                        htmlFor="limit_date"
                                        value="제한일"
                                    />
                                    <DatePicker
                                        id="limit_date"
                                        wrapperClassName="mt-1 w-full"
                                        className="border-gray-300 w-full rounded-md text-sm leading-4"
                                        selected={data.limit_date}
                                        onChange={(date) =>
                                            setData("limit_date", date)
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <InputError
                                        message={errors.limit_date}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <InputLabel htmlFor="denied" value="상태" />
                                    <SelectInput
                                        name="denied"
                                        id="denied"
                                        className="mt-1 w-full text-sm leading-4"
                                        onChange={(e) =>
                                            setData("denied", e.target.value)
                                        }
                                        value={data.denied}
                                    >
                                        <option value="">선택</option>
                                        <option value="N">승인</option>
                                        <option value="Y">거절</option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.birthday}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-gray-50 border-t-2 text-right">
                            <Link
                                href={route("kr.cs.member.expired.index")}
                                className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-sm"
                            >
                                취소
                            </Link>
                            <button
                                type="submit"
                                className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                            >
                                수정
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        휴먼계정 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 휴먼계정의 정보를 수정 하려고 합니다.
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

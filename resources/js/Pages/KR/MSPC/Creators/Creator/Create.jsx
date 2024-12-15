import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/MSPC/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import CheckboxInput from "@/Components/CheckboxInput";
import Checkbox from "@/Components/Checkbox";
import { KR_CREATOR_GROUP } from "@/Stores/Constants";
import Toast from "@/Components/Toast";

const Create = ({ auth, groups }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        creator_group: null,
        nickname: null,
        member_userid: null,
        phone: null,
        email: null,
        sponsorcode: null,
    });
    const [msgToast, setMsgToast] = useState();
    const [systemToast, setSystemToast] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.mspc.creators.creator.store"), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                console.log(props.toast);
                if (props.toast) {
                    setSystemToast(props.toast);
                    openToast();
                }
            },
            onError: (errors) => {},
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
            <Head title="크리에이터즈 조회 : 크리에이터 - create" />

            <div className="p-6">
                <Toast
                    show={toastShow}
                    className={`${
                        systemToast
                            ? "bg-red-50 border-red-300 text-red-800"
                            : "bg-yellow-50 border-yellow-300 text-yellow-800"
                    }  py-2 px-4 mb-4 flex justify-between items-center`}
                >
                    <span>{msgToast ?? systemToast}</span>
                    <button onClick={closeToast} className="ml-auto p-1">
                        &times;
                    </button>
                </Toast>
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">크리에이터 추가</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="그룹을 선택해 주세요."
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("creator_group", e.target.value)
                                    }
                                >
                                    <option value="">선택</option>
                                    {groups.data.map((group) => (
                                        <option
                                            key={group.seq}
                                            value={group.seq}
                                        >
                                            {group.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.creator_group}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="nickname"
                                    value="크리에이터 이름을 입력해 주세요."
                                />
                                <TextInput
                                    id="nickname"
                                    type="text"
                                    name="nickname"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("nickname", e.target.value)
                                    }
                                    placeholder="홍길동"
                                />
                                <InputError
                                    message={errors.nickname}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="member_userid"
                                    value="마상ID를 입력해주세요."
                                />
                                <TextInput
                                    id="member_userid"
                                    type="text"
                                    name="member_userid"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("member_userid", e.target.value)
                                    }
                                    placeholder="test_dk"
                                />
                                <InputError
                                    message={errors.member_userid}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="phone"
                                    value="전화번호를 입력해주세요."
                                />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    placeholder="01012345678"
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="메일주소를 입력해주세요."
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="test_dk@masangsoft.com"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="sponsorcode"
                                    value="후원코드를 입력해주세요."
                                />
                                <TextInput
                                    id="sponsorcode"
                                    type="text"
                                    name="sponsorcode"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("sponsorcode", e.target.value)
                                    }
                                    placeholder="sponsor#1"
                                />
                                <InputError
                                    message={errors.sponsorcode}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.mspc.creators.creator.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-sm"
                        >
                            취소
                        </Link>
                        <button
                            onClick={openModal}
                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                        >
                            추가
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        해킹계정정보 추가
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 계정의 정보를 추가하려고 합니다.
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

export default Create;

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
    });
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.lh.event.attend.reward.store"), {
            preserveScroll: true,
            onSuccess: ({ props }) => {},
            onError: (errors) => {},
        });
    };

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="이벤트 관리 : 상시 출석 보상 추가 - create" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">출석 보상 추가</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-2">
                            한 회차에 아이템이 여러개 지급될 경우<br/>
                            아이템 코드와 개수를 쉼표(,)로 나누어 한번에 입력<br/>
                            예) 아이템 코드 : 2368,2373 / 아이템 갯수 : 1,3<br/><br/>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="day"
                                    value="보상 순번"
                                />
                                <TextInput
                                    id="day"
                                    type="number"
                                    name="day"
                                    min="0"
                                    placeholder="보상 순번"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("day", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.day}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemSequence"
                                    value="보상 아이템 시퀀스 코드"
                                />
                                <TextInput
                                    id="itemSequence"
                                    type="text"
                                    name="itemSequence"
                                    placeholder="보상 아이템 시퀀스 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemSequence", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemSequence}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemCode"
                                    value="보상 아이템 코드"
                                />
                                <TextInput
                                    id="itemCode"
                                    type="text"
                                    name="itemCode"
                                    placeholder="보상 아이템 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemCode", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemCode}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemCount"
                                    value="보상 아이템 갯수"
                                />
                                <TextInput
                                    id="itemCount"
                                    type="text"
                                    name="itemCount"
                                    placeholder="보상 아이템 갯수"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemCount", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemCount}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.lh.event.attend.reward.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
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
                        출석 보상 추가
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 정보로 출석체크 보상을 추가합니다.
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

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

const Create = ({ auth, event, success }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        event_index: event.event_index,
    });
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.lh.event.integration.reward.store"), {
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

    const getEventTypeInputValue = (eventType) => {
        switch (eventType) {
            case "1" :
                return "보상 수령 레벨";
            case "2" :
                return "보상 수령 순번";
            default :
                return "보상 수령 단계";
        }
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="이벤트 관리 : 통합 이벤트 보상 추가 - create" />

            <div className="p-6">
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
                        <div className="col-span-3">
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
            </div>

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">보상 추가</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="reward_level"
                                    value={getEventTypeInputValue(event.event_type)}
                                />
                                <TextInput
                                    id="reward_level"
                                    type="number"
                                    name="reward_level"
                                    className="mt-1 border-gray-300 w-full/2 text-sm leading-4"
                                    onChange={(e) =>
                                        setData("reward_level", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.reward_level}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="reward_item_code"
                                    value="보상 아이템 코드"
                                />
                                <TextInput
                                    id="reward_item_code"
                                    type="text"
                                    name="reward_item_code"
                                    placeholder="보상 아이템 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("reward_item_code", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.reward_item_code}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="reward_count"
                                    value="보상 아이템 갯수"
                                />
                                <TextInput
                                    id="reward_count"
                                    type="number"
                                    name="reward_count"
                                    placeholder="보상 아이템 갯수"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("reward_count", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.reward_count}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="reward_name"
                                    value="보상 아이템 이름"
                                />
                                <TextInput
                                    id="reward_name"
                                    type="text"
                                    name="reward_name"
                                    placeholder="보상 아이템 이름"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("reward_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.reward_name}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="reward_description"
                                    value="보상 아이템 설명"
                                />
                                <TextInput
                                    id="reward_description"
                                    type="text"
                                    name="reward_description"
                                    placeholder="보상 아이템 설명"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("reward_description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.reward_description}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route(
                                "kr.lh.event.integration.management.read",
                                event.event_index
                            )}
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
                        이벤트 보상 추가
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 정보로 이벤트의 보상을 추가합니다.
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
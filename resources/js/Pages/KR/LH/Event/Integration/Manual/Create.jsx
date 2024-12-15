import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import Toast from "@/Components/Toast";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { KR_LH_EVENT_TYPE_GROUP } from "@/Stores/Constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";

const Create = ({ auth, event, success }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        event_index: event.event_index,
        reward_index: null,
        select_index: null,
    });
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.lh.event.integration.manual.store",[
            data.event_index
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

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="이벤트 관리 : 통합 이벤트 보상 수동 지급 - create" />

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
                                {(() => {
                                    switch (event.event_type) {
                                        case "1":
                                            return "레벨 달성";
                                        case "2":
                                            return "출석 / 일일 보상";
                                        default:
                                            return "-";
                                    }
                                })()}
                            </div>
                        </div>
                        <div className="col-span-1">
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
                    </div>
                </div>
                <div className="p-3 text-right">
                    <Link
                        href={route("kr.lh.event.integration.manual.index")}
                        className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
                    >
                        목록
                    </Link>
                </div>

                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">이벤트 보상 수동 지급</p>
                    </div>
                    <div className="grid grid-cols-1 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_type"
                                    value="이벤트 보상 선택"
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 text-sm leading-4"
                                    onChange={(e) =>
                                        setData("reward_index", e.target.value)
                                    }
                                >
                                    <option value="">-</option>
                                    {event.eventReward.map((reward) => (
                                        <option
                                            key={reward.reward_index}
                                            value={reward.reward_index}
                                        >
                                            Lv.{reward.reward_level} - {reward.reward_name} ({reward.reward_count}개)
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.reward_index}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_type"
                                    value="캐릭터 선택 INDEX"
                                />
                                <TextInput
                                    id="select_index"
                                    type="number"
                                    min="0"
                                    name="select_index"
                                    placeholder="캐릭터 선택 INDEX"
                                    className="mt-1 border-gray-300 w-1/2 text-sm leading-4"
                                    onChange={(e) =>
                                        setData("select_index", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.select_index}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                        <b>캐릭터 선택 로그</b>에서 아이템을 지급하고자 하는 유저의 데이터에서 INDEX 항목의 숫자를 입력<br/>
                        <b>보상 수령 로그</b>에서 아이템을 지급하고자 하는 유저의 데이터에서 캐릭터 선택 INDEX 항목의 숫자를 입력<br/>
                        같은 유저라면 위 두 값은 같습니다.<br/>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.lh.event.integration.manual.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
                        >
                            취소
                        </Link>
                        <button
                            onClick={openModal}
                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                        >
                            지급
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        이벤트 보상 수동 지급
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 보상을 수동으로 지급합니다.<br/><br/>
                        <b>보상 수령 로그</b>에 내역이 남아 있을 경우에 아이템이 지급되지 않습니다.<br/>
                        <b>보상 수령 로그</b>를 삭제한 이후에 아이템을 수동 지급할 수 있습니다.<br/><br/>
                        수동지급으로 생성된 보상 수령 로그의 지급 당시 캐릭터 레벨은 0으로 기록됩니다.<br/><br/>
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

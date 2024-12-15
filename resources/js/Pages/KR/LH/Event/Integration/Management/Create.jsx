import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { KR_LH_EVENT_TYPE_GROUP } from "@/Stores/Constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, reset, processing } = useForm({});
    const [modalShow, setModalShow] = useState(false);
    const aEventTypeGroup = KR_LH_EVENT_TYPE_GROUP;

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.lh.event.integration.management.store"), {
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
            <Head title="이벤트 관리 : 통합 이벤트 추가 - create" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">이벤트 추가</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="event_type"
                                    value="이벤트 종류"
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-1/5 text-sm leading-4"
                                    onChange={(e) =>
                                        setData("event_type", e.target.value)
                                    }
                                >
                                    <option value="">-</option>
                                    {aEventTypeGroup.map((group) => (
                                        <option
                                            key={group.id}
                                            value={group.id}
                                        >
                                            {group.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.event_type}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_title"
                                    value="이벤트 번호"
                                />
                                <DatePicker
                                    id="event_title"
                                    autoComplete="off"
                                    placeholderText="기획서상 이벤트 시작 날짜"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.event_title}
                                    onChange={(date) =>
                                        setData("event_title", date)
                                    }
                                    dateFormat="yyyyMMdd"
                                />
                                <InputError
                                    message={errors.event_title}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_description"
                                    value="이벤트 설명"
                                />
                                <TextInput
                                    id="event_description"
                                    type="text"
                                    name="event_description"
                                    placeholder="이벤트 설명"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("event_description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.event_description}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_start"
                                    value="이벤트 시작일"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="event_start"
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.event_start}
                                    onChange={(date) =>
                                        setData("event_start", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.event_start}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_end"
                                    value="이벤트 종료일"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="event_end"
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.event_end}
                                    onChange={(date) =>
                                        setData("event_end", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.event_end}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.lh.event.integration.management.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
                        >
                            취소
                        </Link>
                        <button
                            onClick={openModal}
                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                        >
                            생성
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        이벤트 추가
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 정보로 이벤트를 추가합니다.
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

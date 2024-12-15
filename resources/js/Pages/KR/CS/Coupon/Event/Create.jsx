import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        event_status: -1,
    });
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.cs.coupon.event.store"), {
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
            <Head title="쿠폰 관리 : 쿠폰 이벤트 생성 - create" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">쿠폰 이벤트 생성</p>
                    </div>
                    <div className="grid grid-cols-4 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="contants"
                                    value="적용 게임"
                                />
                                <SelectInput
                                    className="w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("contants", e.target.value)
                                    }
                                >
                                    <option value="">선택</option>
                                    <option value="DK">DK</option>
                                    <option value="CC">CC</option>
                                    <option value="LH">LH</option>
                                    <option value="AO">AO</option>
                                </SelectInput>
                                <InputError
                                    message={errors.contants}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div>
                                <InputLabel
                                    htmlFor="event_name"
                                    value="쿠폰 이벤트명"
                                />
                                <TextInput
                                    id="event_name"
                                    type="url"
                                    name="event_name"
                                    placeholder="쿠폰이 사용될 이벤트 제목"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("event_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.event_name}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="start_event"
                                    value="쿠폰 사용 시작 시간"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="start_event"
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.start_event}
                                    onChange={(date) =>
                                        setData("start_event", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.start_event}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="end_event"
                                    value="쿠폰 사용 종료 시간"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="end_event"
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.end_event}
                                    onChange={(date) =>
                                        setData("end_event", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.end_event}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="make_coupon"
                                    value="쿠폰 생성 수"
                                />
                                <TextInput
                                    id="make_coupon"
                                    type="number"
                                    min="1"
                                    max="100"
                                    name="make_coupon"
                                    placeholder="쿠폰 번호 발급 갯수"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("make_coupon", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.make_coupon}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="use_coupon"
                                    value="쿠폰 사용 횟수"
                                />
                                <TextInput
                                    id="use_coupon"
                                    type="number"
                                    min="1"
                                    name="use_coupon"
                                    placeholder="쿠폰 번호 당 사용 가능 횟수"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("use_coupon", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.use_coupon}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="item_code"
                                    value="지급 아이템 코드"
                                />
                                <TextInput
                                    id="item_code"
                                    type="text"
                                    name="item_code"
                                    placeholder="지급 아이템 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("item_code", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.item_code}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="item_name"
                                    value="지급 아이템 이름"
                                />
                                <TextInput
                                    id="item_name"
                                    type="text"
                                    name="item_name"
                                    placeholder="지급 아이템 이름"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("item_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.item_name}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        {/*
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="cash_value"
                                    value="지급 캐시"
                                />
                                <TextInput
                                    id="cash_value"
                                    type="text"
                                    name="cash_value"
                                    placeholder="지급 캐시"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("cash_value", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.cash_value}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="promotion_code"
                                    value="프로모션 코드"
                                />
                                <TextInput
                                    id="promotion_code"
                                    type="text"
                                    name="promotion_code"
                                    placeholder="프로모션 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("promotion_code", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.promotion_code}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        */}
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.cs.coupon.event.index")}
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
                        쿠폰 이벤트 생성
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 정보로 쿠폰 이벤트를 생성합니다.
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

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Read = ({ auth, couponEvent, couponNumber, success }) => {
    const { data, setData, post, errors, reset, processing } = useForm({});

    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
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
            <Head title="쿠폰 시스템 : 쿠폰 정보 - read" />

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
                        <p className="font-bold">쿠폰 이벤트 정보</p>
                    </div>
                    <div className="grid grid-cols-4 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="contants"
                                    value="적용 게임"
                                />
                                {couponEvent.contants}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="event_name"
                                    value="쿠폰 이벤트명"
                                />
                                {couponEvent.event_name}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="event_status"
                                    value="진행상태"
                                />
                                {(() => {
                                    switch (couponEvent.event_status) {
                                        case "0":
                                            return (
                                                <p className="text-green-600 font-bold">
                                                    진행중
                                                    {new Date().toJSON() >
                                                        couponEvent.end_event && (
                                                        <span className="text-red-800">
                                                            (마감됨)
                                                        </span>
                                                    )}
                                                </p>
                                            );
                                        case "1":
                                            return (
                                                <p className="text-blue-400">
                                                    종료
                                                </p>
                                            );
                                        case "-1":
                                            return (
                                                <p className="text-stone-300">
                                                    진행전
                                                </p>
                                            );
                                    }
                                })()}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="start_event"
                                    value="쿠폰 사용 시작 시간"
                                />
                                {couponEvent.start_event}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="end_event"
                                    value="쿠폰 사용 종료 시간"
                                />
                                {couponEvent.end_event}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="make_coupon"
                                    value="쿠폰 생성 수"
                                />
                                {couponEvent.make_coupon}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="use_coupon"
                                    value="쿠폰 사용 횟수"
                                />
                                {couponEvent.use_coupon}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="item_code"
                                    value="지급 아이템 코드"
                                />
                                {couponEvent.item_code}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="item_name"
                                    value="지급 아이템 이름"
                                />
                                {couponEvent.item_name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-3">
                                    <div>쿠폰 번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>쿠폰 문구</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>쿠폰 사용 횟수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>쿠폰 사용 계정</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {couponNumber.data.map((item) => (
                                <tr
                                    key={item.coupon_index}
                                    className="border-b"
                                >
                                    <td className="p-1 text-center">
                                        {item.number_coupon}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.string_coupon}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.log_coupon_count}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.log_coupon_count > 0 && (
                                            <Link
                                                href={route(
                                                    "kr.cs.coupon.number.read",
                                                    [
                                                        item.event_index,
                                                        item.number_coupon,
                                                    ]
                                                )}
                                                className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            >
                                                리스트
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 text-right">
                    <Link
                        href={route("kr.cs.coupon.event.index")}
                        className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
                    >
                        목록
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Read;

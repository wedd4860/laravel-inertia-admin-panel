import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

const Create = ({ auth, couponEvent, couponNumber, success, toast }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        event_index: couponEvent.event_index,
        coupons: couponNumber,
    });
    const [msgToast, setMsgToast] = useState(success);
    const [systemToast, setSystemToast] = useState(toast);
    const [toastShow, setToastShow] = useState(success !== "" || toast !== "");
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (couponNumber) {
            updateStateWithNewData(couponNumber);
        }
    }, [couponNumber]);

    const updateStateWithNewData = (newData) => {
        newData.map((item, index) => (
            data.coupons[index]['number_coupon'] = item.number_coupon
        ));
    };

    const handleChange = (index, e) => {
        const values = [...data.coupons];
        values[index]['string_coupon'] = e;
        setData("coupons", values);
      };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.cs.coupon.number.store"), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                if (props.toast) {
                    setSystemToast(props.toast);
                }else{
                    setMsgToast(props.success);
                }
                openToast();
            },
            onError: (errors) => {
                if(errors.coupons){
                    setSystemToast(errors.coupons);
                    openToast();
                }
            },
        });
    };

    const getErrorMessage = (index) => {
        return errors[`coupons.${index}.string_coupon`] || null;
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
    }

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="쿠폰 시스템 : 쿠폰 번호 생성 - create" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">쿠폰 이벤트 정보</p>
                    </div>
                    <div className="grid grid-cols-4 p-6 gap-1">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="contants"
                                    value="적용 게임"
                                />
                                {couponEvent.contants}
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div>
                                <InputLabel
                                    htmlFor="event_name"
                                    value="쿠폰 이벤트명"
                                />
                                {couponEvent.event_name}
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
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">쿠폰 번호 생성</p>
                    </div>
                    <Toast
                        show={toastShow}
                        className={`${
                            systemToast
                                ? "bg-red-50 border-red-300 text-red-800"
                                : "bg-yellow-50 border-yellow-300 text-yellow-800"
                        }  py-2 px-4 mb-4 flex justify-between items-center`}
                    >
                        <span>{msgToast || systemToast}</span>
                        <button onClick={closeToast} className="ml-auto p-1">
                            &times;
                        </button>
                    </Toast>
                    {couponNumber.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 px-6 py-1 gap-1 my-3">
                            <div className="col-span-1">
                                <div>
                                    <InputLabel
                                        htmlFor="number_coupon"
                                        value="쿠폰 번호"
                                    />
                                    {item.number_coupon}
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div>
                                    <InputLabel
                                        htmlFor="string_coupon"
                                        value="쿠폰 문구"
                                    />
                                    <TextInput
                                        id="string_coupon"
                                        type="text"
                                        name="string_coupon"
                                        placeholder="쿠폰 번호 대신 사용될 문구"
                                        className="mt-1 border-gray-300 w-full text-sm leading-4"
                                        onChange={(e) =>
                                            handleChange(index, e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={getErrorMessage(index)}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
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
                        쿠폰 번호 생성
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        쿠폰 번호를 발급합니다.
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

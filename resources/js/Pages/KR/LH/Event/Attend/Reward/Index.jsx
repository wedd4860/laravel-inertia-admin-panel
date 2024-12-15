import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Toast from "@/Components/Toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, attendReward, success }) => {
    const { data, setData, patch,  delete: destroy, errors, reset, processing } = useForm({
        idx : attendReward.idx,
    });

    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);

    const handleDelete = (iRewardIndex) => {
        setData("idx", iRewardIndex);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.idx) {
            return false;
        }
        destroy(route("kr.lh.event.attend.reward.destroy", data.idx), {
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
            <Head title="이벤트 관리 : 상시 출석 보상 관리 - index" />

            <div className="p-6 pt-1">
                <Toast
                    show={toastShow}
                    className="bg-yellow-50 border border-yellow-300 text-yellow-800 py-2 px-4 mb-4 flex justify-between items-center"
                >
                    <span>{msgToast}</span>
                    <button onClick={closeToast} className="ml-auto p-1">
                        &times;
                    </button>
                </Toast>

                <div className="py-4 overflow-hidden shadow-sm">
                    <Link
                        href={route("kr.lh.event.attend.reward.create")}
                        className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                    >
                        출석 보상 추가
                    </Link>
                </div>
                <div className="rounded-lg shadow border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-3">
                                    <div>보상 INDEX</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>보상 순번</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>아이템 시퀀스 코드</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>아이템 코드</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>아이템 갯수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div>Action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendReward.data.map((item) => (
                                <tr
                                    key={item.idx}
                                    className="border-b"
                                >
                                    <td className="p-1 text-center">
                                        {item.idx}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.day}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.itemSequence}
                                    </td>
                                    <td className="p-1 text-center">
                                        {item.itemCode}
                                    </td>
                                    <td className="p-1 text-center max-w-80 truncate">
                                        {item.itemCount}
                                    </td>
                                    <td className="p-1 text-center">
                                        <Link
                                            href={route("kr.lh.event.attend.reward.edit", item.idx)}
                                            className="mr-1 border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            수정
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.idx)
                                            }
                                            className=" bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-white text-sm"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        보상 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        INDEX <b>{data.idx}</b>번 보상을 삭제합니다.
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
                                className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                onClick={closeModal}
                                disabled={processing}
                            >
                                삭제
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

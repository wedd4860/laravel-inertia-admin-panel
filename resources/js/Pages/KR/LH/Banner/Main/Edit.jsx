import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MemberGroupButton } from "@/Components/Member/MemberGroupButton";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";

const Edit = ({ auth, banner, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        idx: banner.idx || null,
        siteNo: banner.siteNo || null,
        contentNo: banner.contentNo || null,
        imageSpot: banner.imageSpot || null,
        imageUrl: banner.imageUrl || null,
        imageTargetlink: banner.imageTargetlink || null,
        imageOrder: banner.imageOrder || null,
        imageTitle: banner.imageTitle || null,
        sdate: banner.sdate ? new Date(banner.sdate) : null,
        edate: banner.edate ? new Date(banner.edate) : null,
        regDate: banner.regDate || null,
        sites: banner.sites || null,
    });

    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.idx) {
            return false;
        }

        patch(route("kr.lh.banner.main.update", data.idx), {
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
            <Head title="배너 관리 : 라그하임 메인 배너 수정 - edit" />

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
                        <p className="font-bold">메인 배너 수정</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="imageUrl"
                                    value="이미지 URL"
                                />
                                <TextInput
                                    id="imageUrl"
                                    type="url"
                                    name="imageUrl"
                                    value={data.imageUrl}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("imageUrl", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.imageUrl}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="imageTargetlink"
                                    value="링크 URL"
                                />
                                <TextInput
                                    id="imageTargetlink"
                                    type="url"
                                    name="imageTargetlink"
                                    value={data.imageTargetlink}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("imageTargetlink",e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.imageTargetlink}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="imageOrder"
                                    value="배너 순서"
                                />
                                <TextInput
                                    id="imageOrder"
                                    type="number"
                                    min="0"
                                    name="imageOrder"
                                    value={data.imageOrder}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("imageOrder", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.imageOrder}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="imageTitle"
                                    value="배너 제목"
                                />
                                <TextInput
                                    id="imageTitle"
                                    type="text"
                                    name="imageTitle"
                                    defaultValue={data.imageTitle}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("imageTitle", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.imageTitle}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="sdate"
                                    value="배너 게시 시작일"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="sdate"
                                    value={data.sdate}
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.sdate}
                                    onChange={(date) =>
                                        setData("sdate", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.sdate}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="edate"
                                    value="배너 게시 종료일"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="edate"
                                    value={data.edate}
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.edate}
                                    onChange={(date) =>
                                        setData("edate", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.edate}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.lh.banner.main.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-sm"
                        >
                            취소
                        </Link>
                        <button
                            type="submit"
                            onClick={openModal}
                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                        >
                            수정
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        배너 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 배너 정보를 수정합니다.
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

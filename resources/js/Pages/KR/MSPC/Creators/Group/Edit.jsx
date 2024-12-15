import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/MSPC/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";
import { KR_CREATOR_GROUP } from "@/Stores/Constants";

const Edit = ({ auth, group, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        seq: group.seq || null,
        name: group.name || null,
        gameid: group.gameid || null,
        enddate: group.enddate || null,
        regdate: group.regdate || null,
    });

    const [msgToast, setMsgToast] = useState();
    const [systemToast, setSystemToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const aCreatorGroup = KR_CREATOR_GROUP;

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.seq) {
            return false;
        }

        patch(
            route("kr.mspc.creators.group.update", {
                groupSeq: data.seq,
            }),
            {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    setSystemToast(null);
                    setMsgToast(null);
                    if (props.success) {
                        setMsgToast(props.success);
                        openToast();
                    } else if (props.toast) {
                        setSystemToast(props.toast);
                        openToast();
                    }
                },
                onError: (errors) => {
                    console.log("errors");
                },
            }
        );
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
            <Head title="크리에이터즈 조회 : 그룹 수정 - edit" />

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
                        <p className="font-bold">그룹 수정</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="그룹 번호" />
                                <p className="ml-2">{data.seq}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel htmlFor="name" value="그룹이름" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel htmlFor="gameid" value="활동게임" />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("gameid", e.target.value)
                                    }
                                    defaultValue={data.gameid}
                                >
                                    <option value="">선택</option>
                                    {aCreatorGroup.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.gameid}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="enddate"
                                    value="코드 사용 종료일 및 시간"
                                />
                                <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    id="enddate"
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4 rounded-md shadow-sm"
                                    selected={data.enddate}
                                    onChange={(date) =>
                                        setData("enddate", date)
                                    }
                                    dateFormat="yyyy-MM-dd HH:mm"
                                />
                                <InputError
                                    message={errors.enddate}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.mspc.creators.group.index")}
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
                        그룹 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 그룹의 정보를 수정합니다.
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

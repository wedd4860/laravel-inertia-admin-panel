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
import CardCharacter from "@/Components/CardCharacter";
import { numberFormat } from "@/Helper/numberFormat";

const Edit = ({ auth, point, characters, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        lpu_idx: point.lpu_idx || null,
        lpu_user_idx: point.lpu_user_idx || null,
        lpu_user_lag_idx: point.lpu_user_lag_idx || null,
        lpu_user_idname: point.lpu_user_idname || null,
        lpu_user_lag_point: point.lpu_user_lag_point || null,
        member_srl: point.member_srl || null,
    });

    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.lpu_user_idx) {
            return false;
        }

        patch(route("kr.lh.user.point.update", data.lpu_idx), {
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
            <Head title="회원관리 : 라그하임포인트(LP) 수정 - edit" />

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
                        <p className="font-bold">라그하임포인트(LP) 수정</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lpu_user_idx"
                                    value="게임 유저 no"
                                />
                                <p className="ml-2">{data.lpu_user_idx}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lpu_user_idname"
                                    value="마상no/id"
                                />
                                <p className="ml-2">
                                    {data.member_srl}
                                    {data.member_srl != data.lpu_user_idname
                                        ? "/" + data.lpu_user_idname
                                        : ""}
                                </p>
                                <InputError
                                    message={errors.lpu_user_idname}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lpu_user_lag_point"
                                    value="라그하임 포인트"
                                />
                                <TextInput
                                    id="lpu_user_lag_point"
                                    type="number"
                                    name="lpu_user_lag_point"
                                    defaultValue={data.lpu_user_lag_point}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "lpu_user_lag_point",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lpu_user_lag_point}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <InputLabel value="서버별 케릭터 상세정보" />
                            {characters && characters.length > 0 ? (
                                <div className="grid grid-cols-6 gap-4 mt-2">
                                    {characters.map((character) => (
                                        <CardCharacter key={character.a_index}>
                                            <h2 className="text-xl font-semibold mb-2">
                                                {character.server} 서버
                                            </h2>
                                            <p className="text-gray-700">
                                                케릭터no : {character.a_index}
                                            </p>
                                            <p className="text-gray-700">
                                                케릭터명 : {character.a_name}
                                            </p>
                                            <p className="text-gray-700">
                                                레벨 : {character.a_level}
                                            </p>
                                        </CardCharacter>
                                    ))}
                                </div>
                            ) : (
                                <div className="col-span-2">
                                    <p className="ml-2">
                                        케릭터 정보가 없습니다.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.lh.user.point.index")}
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

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";
import { useState } from "react";
import CheckboxInput from "@/Components/CheckboxInput";
import { KR_PERMISSION_GROUP } from "@/Stores/Constants";

const Edit = ({ auth, member }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        member_srl: member.member_srl,
        user_id: member.user_id,
        permission_group: member.permission_group || [],
        text: member.text || null,
    });
    const aPermissionGroup = KR_PERMISSION_GROUP;

    const handleCheckboxChange = (e) => {
        const strTargetVal = e.target.value;
        const isTarget = e.target.checked;
        setData(
            "permission_group",
            isTarget
                ? [...data.permission_group, strTargetVal]
                : data.permission_group.filter((item) => item !== strTargetVal)
        );
    };
    

    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
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

    const onSubmit = (e) => {
        e.preventDefault();

        patch(route("kr.cs.permission.prime.update", member.member_srl), {
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

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="권한관리 : 관리자 권한 - edit" />

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
                        <p className="font-bold">{data.member_srl}</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="회원번호" />
                                <p className="ml-2">{data.member_srl}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="회원이름" />
                                <p className="ml-2">{data.user_id}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="권한그룹" />

                                <div className="flex flex-wrap mt-2">
                                    {aPermissionGroup.map((item) => (
                                        <CheckboxInput
                                            key={item}
                                            inputId={`permission_group_${item.toLowerCase()}`}
                                            inputName="permission_group"
                                            className="mt-1 border-gray-300"
                                            inputValue={item}
                                            checked={data.permission_group.includes(
                                                item
                                            )}
                                            onChange={handleCheckboxChange}
                                        />
                                    ))}
                                </div>
                                <InputError
                                    message={errors.permission_group}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="사용팀" />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    defaultValue={data.text}
                                    onChange={(e) =>
                                        setData("text", e.target.value)
                                    }
                                >
                                    <option value="">선택</option>
                                    <option value="PL">기획팀</option>
                                    <option value="OP">운영팀</option>
                                </SelectInput>
                                <InputError
                                    message={errors.text}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.cs.permission.prime.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-sm"
                        >
                            목록
                        </Link>
                        <button
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
                        관리자 권한 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        관리자 권한 정보를 수정하려고 합니다.
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

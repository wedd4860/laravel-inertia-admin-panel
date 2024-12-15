import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import CheckboxInput from "@/Components/CheckboxInput";
import Checkbox from "@/Components/Checkbox";
import { KR_PERMISSION_GROUP } from "@/Stores/Constants";

const Create = ({ auth }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        permission_group: [],
    });
    const [modalShow, setModalShow] = useState(false);
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

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.cs.permission.prime.store"), {
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
            <Head title="권한관리 : 관리자 권한 - create" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">관리자 계정 추가</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="member_srl"
                                    value="추가할 회원번호를 작성해주세요."
                                />
                                <TextInput
                                    id="member_srl"
                                    type="text"
                                    name="member_srl"
                                    placeholder="123456"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("member_srl", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.member_srl}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="user_id"
                                    value="회원아이디를 추가해주세요."
                                />
                                <TextInput
                                    id="user_id"
                                    type="text"
                                    name="user_id"
                                    placeholder="userid"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.user_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel value="권한그룹을 추가해주세요." />
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
                                <InputLabel
                                    htmlFor="text"
                                    value="사용팀을 선택해주세요."
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    defaultValue=""
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
                            href={route("kr.cs.block.hacked.index")}
                            className="bg-gray-200 border-2 hover:bg-gray-300 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-sm"
                        >
                            취소
                        </Link>
                        <button
                            onClick={openModal}
                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                        >
                            추가
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        관리자 권한 추가
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 계정의 정보를 추가하려고 합니다.
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

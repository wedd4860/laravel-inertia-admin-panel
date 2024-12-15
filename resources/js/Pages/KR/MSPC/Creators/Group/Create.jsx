import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/MSPC/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import CheckboxInput from "@/Components/CheckboxInput";
import Checkbox from "@/Components/Checkbox";
import { KR_CREATOR_GROUP } from "@/Stores/Constants";

const Create = ({ auth }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        name: null,
        gameid: null,
        enddate: null,
    });
    const [modalShow, setModalShow] = useState(false);
    const aCreatorGroup = KR_CREATOR_GROUP;

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
        post(route("kr.mspc.creators.group.store"), {
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
            <Head title="크리에이터즈 조회 : 그룹 생성 - create" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">그룹 추가</p>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-4">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="추가할 그룹 이름을 작성해주세요."
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="크리에이터 신설 그룹"
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
                                <InputLabel
                                    htmlFor="user_id"
                                    value="활동게임을 선택해주세요."
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("gameid", e.target.value)
                                    }
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
                                    htmlFor="sdate"
                                    value="코드 사용 종료일 및 시간을 선택해 주세요."
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
                        해킹계정정보 추가
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

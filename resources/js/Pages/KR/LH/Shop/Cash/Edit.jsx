import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { KR_LH_SHOP_TYPE_GROUP } from "@/Stores/Constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";

const Edit = ({ auth, item, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm({
        itemIndex : item.itemIndex || null,
        itemCate : item.itemCate || null,
        itemSeq : item.itemSeq || null,
        itemName : item.itemName || null,
        itemImg : item.itemImg || null,
        itemCost : item.itemCost || null,
        itemGeneralQuantify : item.itemGeneralQuantify || 0,
        itemPremiumQuantify : item.itemPremiumQuantify || 0,
        itemLagRush : item.itemLagRush || 0,
        itemLPPoint : item.itemLPPoint || 0,
        itemAddCode : item.itemAddCode || null,
        itemSummary : item.itemSummary || null,
        itemWarning : item.itemWarning || null,
        itemOrder : item.itemOrder || 0,
        itemView : item.itemView || null,
        itemReturnUser : item.itemReturnUser || null,
    });

    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const aShopTypeGroup = KR_LH_SHOP_TYPE_GROUP;

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.itemIndex) {
            return false;
        }

        patch(
            route("kr.lh.shop.cash.update", [
                data.itemIndex,
            ]),
            {
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
            <Head title="라그샵 관리 : 캐시샵 아이템 수정 - update" />

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
                        <p className="font-bold">캐시샵 아이템 정보 수정</p>
                    </div>
                    <div className="grid grid-cols-4 p-6 gap-4">
                        <div className="col-span-3">
                            <div>
                                <InputLabel
                                    htmlFor="itemCate"
                                    value="카테고리"
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-1/2 text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemCate", e.target.value)
                                    }
                                    defaultValue={data.itemCate}
                                >
                                    <option value="">-</option>
                                    {aShopTypeGroup.map((group) => (
                                        <option
                                            key={group.id}
                                            value={group.id}
                                        >
                                            {group.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.itemCate}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemView"
                                    value="공개 여부"
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemView", e.target.value)
                                    }
                                    defaultValue={data.itemView}
                                >
                                    <option value="">-</option>
                                    <option value="N">비공개</option>
                                    <option value="Y">공개</option>
                                </SelectInput>
                                <InputError
                                    message={errors.itemView}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div>
                                <InputLabel
                                    htmlFor="itemReturnUser"
                                    value="구매 종류"
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-2/3 text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemReturnUser", e.target.value)
                                    }
                                    defaultValue={data.itemReturnUser}
                                >
                                    <option value="">-</option>
                                    <option value="N">일반</option>
                                    <option value="Y">복귀자 전용</option>
                                    <option value="L">1회 구매 제한</option>
                                </SelectInput>
                                <InputError
                                    message={errors.itemReturnUser}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemOrder"
                                    value="정렬"
                                />
                                <TextInput
                                    id="itemOrder"
                                    name="itemOrder"
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={data.itemOrder}
                                    placeholder="큰 숫자가 먼저 출력"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemOrder", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemOrder}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemSeq"
                                    value="상품 코드"
                                />
                                <TextInput
                                    id="itemSeq"
                                    name="itemSeq"
                                    type="text"
                                    maxLength="30"
                                    value={data.itemSeq}
                                    placeholder="상품 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemSeq", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemSeq}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div>
                                <InputLabel
                                    htmlFor="itemAddCode"
                                    value="인게임 아이템 코드, 갯수"
                                />
                                <TextInput
                                    id="itemAddCode"
                                    name="itemAddCode"
                                    type="text"
                                    maxLength="255"
                                    value={data.itemAddCode}
                                    placeholder="인게임 아이템 코드, 갯수. 마지막 | 필수. ex)아이템코드,갯수|아이템코드,갯수|"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemAddCode", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemAddCode}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="itemName"
                                    value="아이템 이름"
                                />
                                <TextInput
                                    id="itemName"
                                    name="itemName"
                                    type="text"
                                    maxLength="30"
                                    value={data.itemName}
                                    placeholder="아이템 이름"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemName", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemName}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="itemCost"
                                    value="아이템 가격"
                                />
                                <TextInput
                                    id="itemCost"
                                    name="itemCost"
                                    type="number"
                                    value={data.itemCost}
                                    placeholder="아이템 가격"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemCost", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemCost}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div>
                                <InputLabel
                                    htmlFor="itemImg"
                                    value="아이템 이미지"
                                />
                                <TextInput
                                    id="itemImg"
                                    name="itemImg"
                                    type="url"
                                    maxLength="250"
                                    value={data.itemImg}
                                    placeholder="아이템 이미지"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemImg", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemImg}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemGeneralQuantify"
                                    value="프리미엄"
                                />
                                <TextInput
                                    id="itemGeneralQuantify"
                                    name="itemGeneralQuantify"
                                    type="number"
                                    value={data.itemGeneralQuantify}
                                    placeholder="프리미엄 서비스"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemGeneralQuantify", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemGeneralQuantify}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemPremiumQuantify"
                                    value="프리미엄 플러스"
                                />
                                <TextInput
                                    id="itemPremiumQuantify"
                                    name="itemPremiumQuantify"
                                    type="number"
                                    value={data.itemPremiumQuantify}
                                    placeholder="프리미엄 플러스 서비스"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemPremiumQuantify", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemPremiumQuantify}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemLagRush"
                                    value="라그러쉬"
                                />
                                <TextInput
                                    id="itemLagRush"
                                    name="itemLagRush"
                                    type="number"
                                    value={data.itemLagRush}
                                    placeholder="라그러쉬"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemLagRush", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemLagRush}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="itemLPPoint"
                                    value="지급 LP 포인트"
                                />
                                <TextInput
                                    id="itemLPPoint"
                                    name="itemLPPoint"
                                    type="number"
                                    value={data.itemLPPoint}
                                    placeholder="지급 LP 포인트"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemLPPoint", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemLPPoint}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div>
                                <InputLabel
                                    htmlFor="itemSummary"
                                    value="상세설명"
                                />
                                <TextAreaInput
                                    id="itemSummary"
                                    name="itemSummary"
                                    maxLength="300"
                                    placeholder="상세설명"
                                    value={data.itemSummary}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4 min-h-24"
                                    onChange={(e) =>
                                        setData("itemSummary", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemSummary}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div>
                                <InputLabel
                                    htmlFor="itemWarning"
                                    value="추가혜택"
                                />
                                <TextAreaInput
                                    id="itemWarning"
                                    name="itemWarning"
                                    placeholder="추가혜택"
                                    value={data.itemWarning}
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("itemWarning", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.itemWarning}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.lh.shop.cash.index")}
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
                        캐시샵 아이템 정보 수정
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 정보로 캐시샵 아이템 정보를 수정합니다.
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

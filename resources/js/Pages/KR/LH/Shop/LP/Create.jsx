import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        lsi_sale_start_date : null,
        lsi_sale_end_date : null,
    });
    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kr.lh.shop.lp.store"), {
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
            <Head title="라그샵 관리 : L.P MALL 아이템 생성 - create" />

            <div className="p-6">
                <div className="rounded-lg shadow border">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold">L.P MALL 아이템 생성</p>
                    </div>
                    <div className="grid grid-cols-4 p-6 gap-4">
                        <div className="col-span-3">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_goods_type"
                                    value="판매 종류"
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-1/2 text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "lsi_goods_type",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">-</option>
                                    <option value="NORMAL">일반</option>
                                    <option value="MONTH">한정상품 1</option>
                                    <option value="WEEK">한정상품 2</option>
                                </SelectInput>
                                <InputError
                                    message={errors.lsi_goods_type}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_enabled"
                                    value="활성화 여부"
                                />
                                <SelectInput
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("lsi_enabled", e.target.value)
                                    }
                                >
                                    <option value="">-</option>
                                    <option value="N">비활성</option>
                                    <option value="Y">활성</option>
                                </SelectInput>
                                <InputError
                                    message={errors.lsi_enabled}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_goods_code"
                                    value="상품 코드"
                                />
                                <TextInput
                                    id="lsi_goods_code"
                                    name="lsi_goods_code"
                                    type="text"
                                    maxLength="10"
                                    placeholder="상품 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "lsi_goods_code",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lsi_goods_code}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_item_idx"
                                    value="인게임 아이템 코드"
                                />
                                <TextInput
                                    id="lsi_item_idx"
                                    name="lsi_item_idx"
                                    type="number"
                                    min="0"
                                    max="32767"
                                    placeholder="인게임 아이템 코드"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("lsi_item_idx", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.lsi_item_idx}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_item_cnt"
                                    value="지급 갯수"
                                />
                                <TextInput
                                    id="lsi_item_cnt"
                                    name="lsi_item_cnt"
                                    type="number"
                                    min="0"
                                    max="32767"
                                    placeholder="인게임 아이템 지급 갯수"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("lsi_item_cnt", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.lsi_item_cnt}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_goods_name"
                                    value="아이템 이름"
                                />
                                <TextInput
                                    id="lsi_goods_name"
                                    name="lsi_goods_name"
                                    type="text"
                                    maxLength="250"
                                    placeholder="아이템 이름"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "lsi_goods_name",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lsi_goods_name}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_sale_point"
                                    value="LP 가격"
                                />
                                <TextInput
                                    id="lsi_sale_point"
                                    name="lsi_sale_point"
                                    type="number"
                                    placeholder="LP 가격"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "lsi_sale_point",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lsi_sale_point}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_goods_img"
                                    value="아이템 이미지"
                                />
                                <TextInput
                                    id="lsi_goods_img"
                                    name="lsi_goods_img"
                                    type="url"
                                    maxLength="250"
                                    placeholder="아이템 이미지"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData("lsi_goods_img", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.lsi_goods_img}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_sale_limit_cnt"
                                    value="총 판매 갯수"
                                />
                                <TextInput
                                    id="lsi_sale_limit_cnt"
                                    name="lsi_sale_limit_cnt"
                                    type="number"
                                    placeholder="총 판매 갯수"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "lsi_sale_limit_cnt",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lsi_sale_limit_cnt}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_buy_limit_cnt"
                                    value="구매 가능 횟수"
                                />
                                <TextInput
                                    id="lsi_buy_limit_cnt"
                                    name="lsi_buy_limit_cnt"
                                    type="number"
                                    placeholder="구매 가능 횟수"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    onChange={(e) =>
                                        setData(
                                            "lsi_buy_limit_cnt",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lsi_buy_limit_cnt}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_sale_start_date"
                                    value="판매 시작일"
                                />
                                <DatePicker
                                    id="lsi_sale_start_date"
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.lsi_sale_start_date}
                                    onChange={(date) =>
                                        setData("lsi_sale_start_date", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                />
                                <InputError
                                    message={errors.lsi_sale_start_date}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_sale_end_date"
                                    value="판매 종료일"
                                />
                                <DatePicker
                                    id="lsi_sale_end_date"
                                    autoComplete="off"
                                    wrapperClassName="mt-1 w-full"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4"
                                    selected={data.lsi_sale_end_date}
                                    onChange={(date) =>
                                        setData("lsi_sale_end_date", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                />
                                <InputError
                                    message={errors.lsi_sale_end_date}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div>
                                <InputLabel
                                    htmlFor="lsi_description"
                                    value="상세설명"
                                />
                                <TextAreaInput
                                    id="lsi_description"
                                    name="lsi_description"
                                    placeholder="상세설명"
                                    className="mt-1 border-gray-300 w-full text-sm leading-4 min-h-16"
                                    onChange={(e) =>
                                        setData("lsi_description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.lsi_description}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t-2 text-right">
                        <Link
                            href={route("kr.lh.shop.lp.index")}
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
                        L.P MALL 아이템 생성
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 정보로 L.P MALL 아이템을 추가합니다.
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

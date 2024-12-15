import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, items, queryParams = null, success }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({
        lsi_idx: null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.shop.lp.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_column) {
            if (queryParams.order_type === "asc") {
                queryParams.order_type = "desc";
            } else {
                queryParams.order_type = "asc";
            }
        } else {
            queryParams.sort_column = name;
            queryParams.order_type = "asc";
        }
        router.get(route("kr.lh.shop.lp.index"), queryParams);
    };

    const handleDelete = (idx) => {
        setData("lsi_idx", idx);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.lsi_idx) {
            return false;
        }
        destroy(route(
                "kr.lh.shop.lp.destroy",
                [
                    data.lsi_idx,
                ]), {
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
            <Head title="라그샵 관리 : L.P MALL 아이템 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.lh.shop.lp.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    아이템 추가
                </Link>
            </div>

            <div className="p-6 overflow-hidden shadow-sm">
                <Toast
                    show={toastShow}
                    className="bg-yellow-50 border border-yellow-300 text-yellow-800 py-2 px-4 mb-4 flex justify-between items-center"
                >
                    <span>{msgToast}</span>
                    <button onClick={closeToast} className="ml-auto p-1">
                        &times;
                    </button>
                </Toast>
                <div className="overflow-auto rounded border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-3">
                                    <div className="min-w-24">종류</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        상품 코드
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        아이템
                                        <br />
                                        이름
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        지급
                                        <br />
                                        갯수
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        인게임
                                        <br />
                                        아이템 코드
                                    </div>
                                </th>
                                <TableHeading
                                    name="lsi_sale_point"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">가격</div>
                                </TableHeading>
                                <TableHeading
                                    name="lsi_sale_limit_cnt"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">총 수량</div>
                                </TableHeading>
                                <TableHeading
                                    name="lsi_sale_cnt"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">판매 수량</div>
                                </TableHeading>
                                <TableHeading
                                    name="lsi_buy_limit_cnt"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">
                                        구매 가능
                                        <br />
                                        횟수
                                    </div>
                                </TableHeading>
                                <TableHeading
                                    name="lsi_sale_start_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">판매 시작</div>
                                </TableHeading>
                                <TableHeading
                                    name="lsi_sale_end_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">판매 종료</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        활성화
                                        <br />
                                        여부
                                    </div>
                                </th>
                                <TableHeading
                                    name="lsi_regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-40">생성일</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">Action</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={
                                            queryParams.lsi_goods_type
                                        }
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "lsi_goods_type",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">전체</option>
                                        <option value="NORMAL">일반</option>
                                        <option value="MONTH">
                                            한정상품 1
                                        </option>
                                        <option value="WEEK">한정상품 2</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="아이템 코드"
                                        defaultValue={
                                            queryParams.lsi_goods_code
                                        }
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "lsi_goods_code",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("lsi_goods_code", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="아이템 이름"
                                        defaultValue={
                                            queryParams.lsi_goods_name
                                        }
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "lsi_goods_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("lsi_goods_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.lsi_enabled}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "lsi_enabled",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">전체</option>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </SelectInput>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.data.map((item) => (
                                <tr key={item.itemIndex} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {(() => {
                                            switch (item.lsi_goods_type) {
                                                case "NORMAL":
                                                    return "일반";
                                                case "MONTH":
                                                    return "한정상품 1";
                                                case "WEEK":
                                                    return "한정상품 2";
                                                default:
                                                    return "-";
                                            }
                                        })()}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_goods_code}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.lsi_goods_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_item_cnt}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_item_idx}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_sale_point}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_sale_limit_cnt}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_sale_cnt}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_buy_limit_cnt}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_sale_start_date}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_sale_end_date}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_enabled}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.lsi_regdate}
                                    </td>
                                    <td className="px-3 py-2 w-4 text-center">
                                        <Link
                                            href={route(
                                                "kr.lh.shop.lp.edit",
                                                item.lsi_idx
                                            )}
                                            className="mr-1 border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            수정
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.lsi_idx)
                                            }
                                            className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={items.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        L.P MALL 아이템 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 L.P MALL 아이템을 삭제합니다.
                        <br />
                        유저에게 공개되어있는 아이템은 삭제할 수 없습니다.
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

export default Index;

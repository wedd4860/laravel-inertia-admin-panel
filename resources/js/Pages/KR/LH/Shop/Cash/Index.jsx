import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/LH/AuthenticatedLayout";
import { KR_LH_SHOP_TYPE_GROUP } from "@/Stores/Constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, cashItems, queryParams = null, success }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({
        itemIndex : null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);
    const aShopTypeGroup = KR_LH_SHOP_TYPE_GROUP;

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.shop.cash.index"), queryParams);
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
        router.get(route("kr.lh.shop.cash.index"), queryParams);
    };

    const handleDelete = (iItemIndex) => {
        setData("itemIndex", iItemIndex);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.itemIndex) {
            return false;
        }
        destroy(route(
                "kr.lh.shop.cash.destroy",
                [
                    data.itemIndex,
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
            <Head title="라그샵 관리 : 캐시샵 아이템 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.lh.shop.cash.create")}
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
                                    <div className="min-w-6">카테고리</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">
                                        상품 코드
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        아이템 이름
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        인게임 아이템 코드
                                        <br />
                                        (코드,갯수)
                                    </div>
                                </th>
                                <TableHeading
                                    name="itemCost"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">가격</div>
                                </TableHeading>
                                <TableHeading
                                    name="itemGeneralQuantify"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">프리미엄</div>
                                </TableHeading>
                                <TableHeading
                                    name="itemPremiumQuantify"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">
                                        프리미엄
                                        <br />
                                        플러스
                                    </div>
                                </TableHeading>
                                <TableHeading
                                    name="itemLagRush"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">
                                        라그러쉬
                                        <br />
                                        (일)
                                    </div>
                                </TableHeading>
                                <TableHeading
                                    name="itemLPPoint"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">지급 LP</div>
                                </TableHeading>
                                <TableHeading
                                    name="itemOrder"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">정렬</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        활성화
                                        <br />
                                        여부
                                    </div>
                                </th>
                                <TableHeading
                                    name="regDate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-40">생성일</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">Action</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.itemCate}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "itemCate",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">전체</option>
                                        {aShopTypeGroup.map((group) => (
                                            <option
                                                key={group.id}
                                                value={group.id}
                                            >
                                                {group.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="아이템 코드"
                                        defaultValue={queryParams.itemSeq}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "itemSeq",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("itemSeq", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="아이템 이름"
                                        defaultValue={queryParams.itemName}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "itemName",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("itemName", e)
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
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.itemView}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "itemView",
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
                            {cashItems.data.map((item) => (
                                <tr key={item.itemIndex} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {(() => {
                                            return aShopTypeGroup.find(typeName => typeName.id == item.itemCate).name;
                                        })()}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemSeq}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.itemName}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.itemAddCode}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemCost}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemGeneralQuantify}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemPremiumQuantify}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemLagRush}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemLPPoint}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemOrder}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.itemView}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.regDate}
                                    </td>
                                    <td className="px-3 py-2 w-4 text-center">
                                        <Link
                                            href={route(
                                                "kr.lh.shop.cash.edit",
                                                item.itemIndex
                                            )}
                                            className="mr-1 border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            수정
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.itemIndex)
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
                    links={cashItems.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        캐시샵 아이템 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 캐시샵 아이템을 삭제합니다.
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

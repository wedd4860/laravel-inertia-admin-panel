import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, coupons, queryParams = null }) => {
    const {
        data,
        setData,
        delete: destroy,
        patch,
        errors,
        reset,
        processing,
    } = useForm({
        event_index: null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [toastShow, setToastShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [startModalShow, setStartModalShow] = useState(false);
    const [finishModalShow, setFinishModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.coupon.event.index"), queryParams);
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
        router.get(route("kr.cs.coupon.event.index"), queryParams);
    };

    const handleCouponEvent = (iEventIndex, strAction) => {
        setData("event_index", iEventIndex);
        openModal(strAction);
    };

    const onSubmit = (value) => (e) => {
        e.preventDefault();
        closeModal();
        if (!data.event_index) {
            return false;
        }

        if (value === "-1") {
            destroy(route("kr.cs.coupon.event.destroy", data.event_index), {
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
            return;
        } else if (value === "0" || value === "1") {
            patch(
                route("kr.cs.coupon.event.update", [data.event_index, value]),
                {
                    preserveScroll: true,
                    onSuccess: ({ props }) => {
                        setMsgToast(props.success);
                        openToast();
                    },
                    onError: (errors) => {
                        console.log("errors");
                    },
                }
            );
            return;
        }
        return;
    };

    const openModal = (strAction) => {
        if (strAction == "start") {
            setStartModalShow(true);
        } else if (strAction == "finish") {
            setFinishModalShow(true);
        } else if (strAction == "delete") {
            setDeleteModalShow(true);
        }
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        setStartModalShow(false);
        setFinishModalShow(false);
        setDeleteModalShow(false);
    };

    const openToast = () => {
        setToastShow(true);
    };

    const closeToast = () => {
        setToastShow(false);
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="쿠폰 : 쿠폰 관리 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.cs.coupon.event.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    쿠폰 생성
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
                                    <div className="min-w-3">번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">이벤트명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">적용 게임</div>
                                </th>
                                <TableHeading
                                    name="start_event"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">시작일</div>
                                </TableHeading>
                                <TableHeading
                                    name="end_event"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">종료일</div>
                                </TableHeading>
                                <TableHeading
                                    name="reg_date"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-24">생성일</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">이벤트 상태</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">Actions</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="w-24">Detail</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="이벤트명"
                                        defaultValue={queryParams.event_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "event_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("event_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2 max-w-24">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="적용 게임"
                                        defaultValue={queryParams.contants}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "contants",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("contants", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.data.map((item) => (
                                <tr key={item.event_index} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.event_index}
                                    </td>
                                    <td className="px-3 py-2 max-w-120">
                                        {item.event_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.contants}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.start_event}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.end_event}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.reg_date}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {(() => {
                                            if (item.number_coupon_count > 0) {
                                                switch (item.event_status) {
                                                    case "0":
                                                        return (
                                                            <p className="text-green-600 font-bold">
                                                                진행중
                                                                {new Date().toJSON() >
                                                                    item.end_event && (
                                                                    <span className="text-red-800">
                                                                        (마감됨)
                                                                    </span>
                                                                )}
                                                            </p>
                                                        );
                                                    case "1":
                                                        return (
                                                            <p className="text-blue-400">
                                                                종료
                                                            </p>
                                                        );
                                                    case "-1":
                                                        return (
                                                            <p className="text-stone-300">
                                                                진행전
                                                            </p>
                                                        );
                                                }
                                            } else {
                                                return (
                                                    <p className="text-stone-600 font-bold">
                                                        생성중
                                                    </p>
                                                );
                                            }
                                        })()}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.event_status != 0 ? (
                                            <>
                                                {(() => {
                                                    if (
                                                        item.number_coupon_count >
                                                            0 &&
                                                        new Date().toJSON() <
                                                            item.end_event
                                                    ) {
                                                        return (
                                                            <button
                                                                onClick={() =>
                                                                    handleCouponEvent(
                                                                        item.event_index,
                                                                        "start"
                                                                    )
                                                                }
                                                                className="float-left bg-green-500 hover:bg-green-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                                            >
                                                                시작
                                                            </button>
                                                        );
                                                    }
                                                })()}
                                                <button
                                                    onClick={() =>
                                                        handleCouponEvent(
                                                            item.event_index,
                                                            "delete"
                                                        )
                                                    }
                                                    className="float-right bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all mr-2 text-white text-sm"
                                                >
                                                    삭제
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleCouponEvent(
                                                        item.event_index,
                                                        "finish"
                                                    )
                                                }
                                                className="float-left bg-blue-500 hover:bg-blue-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                            >
                                                종료
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <Link
                                            href={route(
                                                "kr.cs.coupon.event.read",
                                                item.event_index
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            상세보기
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={coupons.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                {startModalShow && (
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            이벤트 상태 변경 - 시작
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            쿠폰 이벤트를 시작합니다.
                            <br />
                            해당 쿠폰을 사용하여 보상을 지급받을 수 있습니다.
                            <br />
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
                            <form onSubmit={onSubmit("0")}>
                                <button
                                    type="submit"
                                    className="border-0 bg-green-500 hover:bg-green-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                    disabled={processing}
                                >
                                    시작
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {finishModalShow && (
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            이벤트 상태 변경 - 종료
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            쿠폰 이벤트를 종료합니다.
                            <br />
                            해당 쿠폰을 사용할 수 없습니다.
                            <br />
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
                            <form onSubmit={onSubmit("1")}>
                                <button
                                    type="submit"
                                    className="border-0 bg-blue-500 hover:bg-blue-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                    disabled={processing}
                                >
                                    종료
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {deleteModalShow && (
                    <div className="p-3">
                        <h2 className="text-lg font-medium text-gray-900">
                            쿠폰 삭제
                        </h2>
                        <p className="mt-1 p-2 text-sm text-gray-600">
                            쿠폰 이벤트와 쿠폰번호를 삭제합니다.
                            <br />
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
                            <form onSubmit={onSubmit("-1")}>
                                <button
                                    type="submit"
                                    className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                    disabled={processing}
                                >
                                    삭제
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

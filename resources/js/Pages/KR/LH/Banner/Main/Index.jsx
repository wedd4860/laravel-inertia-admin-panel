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

const Index = ({ auth, banners, queryParams = null, success }) => {
    const {
        data,
        setData,
        delete: destroy,
        put,
        errors,
        reset,
        processing,
    } = useForm({
        idx: null,
    });

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState(success);
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);

    const searchFieldChanged = (name, value) => {
        value = value.trim();
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.lh.banner.main.index"), queryParams);
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
        router.get(route("kr.lh.banner.main.index"), queryParams);
    };

    const handleDeleteBanner = (iBannerId) => {
        setData("idx", iBannerId);
        openModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.idx) {
            return false;
        }
        destroy(route("kr.lh.banner.main.destroy", data.idx), {
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
            <Head title="배너 관리 : 라그하임 메인 배너 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.lh.banner.main.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    메인 배너 추가
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
                                <TableHeading
                                    name="imageOrder"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-3">배너순서</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">이미지 URL</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">링크 URL</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">제목</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">시작일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">종료일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="w-24">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="링크 URL"
                                        defaultValue={
                                            queryParams.image_target_link
                                        }
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "image_target_link",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("image_target_link", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="제목"
                                        defaultValue={queryParams.image_title}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "image_title",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("image_title", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.data.map((item) => (
                                <tr key={item.idx} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                        {item.imageOrder}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.imageUrl}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.imageTargetlink}
                                    </td>
                                    <td className="px-3 py-2 max-w-80 truncate">
                                        {item.imageTitle}
                                    </td>
                                    <td className="px-3 py-2">{item.sdate}</td>
                                    <td className="px-3 py-2">{item.edate}</td>
                                    <td className="px-3 py-2 text-center">
                                        <button
                                            onClick={() =>
                                                handleDeleteBanner(item.idx)
                                            }
                                            className="bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all mr-1 text-white text-sm"
                                        >
                                            삭제
                                        </button>
                                        <Link
                                            href={route(
                                                "kr.lh.banner.main.edit",
                                                item.idx
                                            )}
                                            className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                        >
                                            수정
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={banners.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        배너 삭제
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 배너를 삭제합니다.
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
                                className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm"
                                onClick={closeModal}
                                disabled={processing}
                            >
                                삭제
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

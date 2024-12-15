import Pagination from "@/Components/Pagination";
import TableTdCoin from "@/Components/MCoin/TableTdCoin";
import TableTdText from "@/Components/MCoin/TableTdText";
import TableThTitle from "@/Components/MCoin/TableThTitle";
import AuthenticatedLayout from "@/Layouts/KR/MSPC/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import Toast from "@/Components/Toast";

const Sponsorship = ({
    auth,
    creator,
    sponsorships,
    queryParams = null,
    success,
}) => {
    const { data, setData, patch, errors, reset, processing } = useForm();

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [systemToast, setSystemToast] = useState();
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.mspc.creators.creator.index"), queryParams);
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
        router.get(route("kr.mspc.creators.sponsorships.index"), queryParams);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.sponsorshipSeq) {
            return false;
        }
        patch(
            route("kr.mspc.creators.sponsorship.update", {
                sponsorshipSeq: data.sponsorshipSeq,
                type: data.status,
            }),
            {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    console.log(props)
                    setSystemToast(null);
                    setMsgToast(null);
                    if (props.success) {
                        setMsgToast(props.success);
                        openToast();
                    } else if (props.toast) {
                        setSystemToast(props.toast);
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

    const handleCancelSponsorship = (seq) => {
        setData({ sponsorshipSeq: seq, status: "cancel" });
        openModal();
    };

    if (!creator) return false;
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="크리에이터 스폰서 조회 : 크리에이터 - show" />
            <div className="px-6 py-4 overflow-hidden border-b-2 border-gray-100">
                <Link
                    href={route("kr.mspc.creators.creator.index")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    목록
                </Link>
            </div>

            <div className="p-6 grid grid-cols-1 gap-3">
                <Toast
                    show={toastShow}
                    className={`${
                        systemToast
                            ? "bg-red-50 border-red-300 text-red-800"
                            : "bg-yellow-50 border-yellow-300 text-yellow-800"
                    }  py-2 px-4 mb-4 flex justify-between items-center`}
                >
                    <span>{msgToast ?? systemToast}</span>
                    <button onClick={closeToast} className="ml-auto p-1">
                        &times;
                    </button>
                </Toast>
                <div className="rounded-lg shadow border cols-span-2">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold uppercase">크리에이터</p>
                    </div>
                    <div className="bg-gray-50 overflow-y-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-300">
                                <tr className="text-nowrap text-center">
                                    <TableThTitle title="크리에이터 번호" />
                                    <TableThTitle title="마상 userId" />
                                    <TableThTitle title="마상 닉네임" />
                                    <TableThTitle title="마상 회원번호" />
                                    <TableThTitle title="크리에이터 전화번호" />
                                    <TableThTitle title="크리에이터 메일" />
                                    <TableThTitle title="크리에이터 후원코드" />
                                    <TableThTitle title="현재 심사정보" />
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center bg-white">
                                <tr>
                                    <TableTdText text={creator.seq} />
                                    <TableTdText text={creator.member_userid} />
                                    <TableTdText text={creator.nickname} />
                                    <TableTdText text={creator.member_srl} />
                                    <TableTdText text={creator.phone} />
                                    <TableTdText text={creator.email} />
                                    <TableTdText text={creator.sponsorcode} />
                                    <TableTdText
                                        text={
                                            creator.status === "0"
                                                ? "심사대기"
                                                : "심사완료"
                                        }
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 gap-3">
                <div className="rounded-lg shadow border cols-span-2">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold uppercase">후원자 목록</p>
                    </div>
                    <div className="bg-gray-50 overflow-y-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-300">
                                <tr className="text-nowrap text-center">
                                    <TableThTitle title="마상 회원번호" />
                                    <TableThTitle title="마상 userId" />
                                    <TableThTitle title="마상 email" />
                                    <TableThTitle title="마상 nickname" />
                                    <TableThTitle title="후원시작 시간" />
                                    <TableThTitle title="후원종료 시간" />
                                    <TableThTitle title="actions" />
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center bg-white">
                                {sponsorships.data.length > 0 ? (
                                    sponsorships.data.map((sponsor) => (
                                        <tr key={sponsor.seq}>
                                            <TableTdText
                                                text={sponsor.member.member_srl}
                                            />
                                            <TableTdText
                                                text={sponsor.member.user_id}
                                            />
                                            <TableTdText
                                                text={
                                                    sponsor.member.email_address
                                                }
                                            />
                                            <TableTdText
                                                text={sponsor.member.nick_name}
                                            />
                                            <TableTdText
                                                text={sponsor.startdate}
                                            />
                                            <TableTdText
                                                text={sponsor.enddate}
                                            />
                                            <td className="px-3 py-2 text-center">
                                                <button
                                                    className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm mr-1"
                                                    onClick={() =>
                                                        handleCancelSponsorship(
                                                            sponsor.seq
                                                        )
                                                    }
                                                >
                                                    후원취소
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <TableTdText
                                            colSpan="7"
                                            text="후원내역이 없습니다."
                                        />
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Pagination
                links={sponsorships.meta.links}
                queryParams={queryParams}
            />

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        후원취소
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 크리에이터 후원을 취소 하려고 합니다.
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
                                후원취소
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};
export default Sponsorship;

import { ListOnToast } from "@/Components/ListOnToast";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/KR/MSPC/AuthenticatedLayout";
import { KR_CREATOR_GROUP } from "@/Stores/Constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, creators, queryParams = null, success }) => {
    const { data, setData, patch, errors, reset, processing } = useForm();

    queryParams = queryParams || {};
    const [msgToast, setMsgToast] = useState();
    const [systemToast, setSystemToast] = useState();
    const [toastShow, setToastShow] = useState(success !== "");
    const [modalShow, setModalShow] = useState(false);
    const aCreatorGroup = KR_CREATOR_GROUP;

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
        router.get(route("kr.cs.banner.main.index"), queryParams);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.creatorSeq) {
            return false;
        } else if (
            !data.status.includes("approve") &&
            !data.status.includes("cancel")
        ) {
            return false;
        }
        patch(
            route("kr.mspc.creators.decision.update", {
                creatorSeq: data.creatorSeq,
                type: data.status,
            }),
            {
                preserveScroll: true,
                onSuccess: ({ props }) => {
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

    const handleApproveCreator = (seq) => {
        setData({ creatorSeq: seq, status: "approve" });
        openModal();
    };

    const handleCancelCreator = (seq) => {
        setData({ creatorSeq: seq, status: "cancel" });
        openModal();
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="크리에이터즈 조회 : 크리에이터 - index" />

            <div className="px-6 py-4 overflow-hidden shadow-sm">
                <Link
                    href={route("kr.mspc.creators.creator.create")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    크리에이터 추가
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
                                    <div className="min-w-56">그룹명</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">활동게임</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">유저아이디</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">유저이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-40">유저닉네임</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">신청닉네임</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">신청 전화번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">신청 메일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">후원코드</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">후원자수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-3">심사상태</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-20">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="그룹명"
                                        defaultValue={queryParams.groupName}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "groupName",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("groupName", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.gameid}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "gameid",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        {aCreatorGroup.map((game) => (
                                            <option
                                                key={game.id}
                                                value={game.id}
                                            >
                                                {game.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="아이디"
                                        defaultValue={queryParams.memberUserid}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "memberUserid",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("memberUserid", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="신청닉네임"
                                        defaultValue={queryParams.nickname}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "nickname",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("nickname", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="신청전화번호"
                                        defaultValue={queryParams.phone}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("phone", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="신청메일"
                                        defaultValue={queryParams.email}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("email", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="후원코드"
                                        defaultValue={queryParams.sponsorcode}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "sponsorcode",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("sponsorcode", e)
                                        }
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {creators.data.map((item) => (
                                <tr key={item.seq} className="border-b">
                                    <td className="px-3 py-2">
                                        {item.creatorGroup.name}
                                    </td>
                                    <td className="px-3 py-2 text-center min-w-24">
                                        {item.group_game_title}
                                    </td>
                                    <td className="px-3 py-2 min-w-40">
                                        {item.member_userid}
                                    </td>
                                    <td className="px-3 py-2 min-w-40">
                                        {item.member.user_name}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.member.nick_name}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-40">
                                        {item.nickname}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-40">
                                        {item.phone}
                                    </td>
                                    <td className="px-3 py-2">{item.email}</td>
                                    <td className="px-3 py-2">
                                        {item.sponsorcode}
                                    </td>
                                    <td className="px-3 py-2">
                                        {
                                            item.creators_creator_sponsorship_count
                                        }
                                        명
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.status_title}
                                    </td>
                                    <td className="px-3 py-2 text-center min-w-56">
                                        {item.status == 0 ? (
                                            <button
                                                className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm mr-1"
                                                onClick={() =>
                                                    handleApproveCreator(
                                                        item.seq
                                                    )
                                                }
                                            >
                                                심사승인
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="border-0 bg-red-500 hover:bg-red-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm mr-1"
                                                    onClick={() =>
                                                        handleCancelCreator(
                                                            item.seq
                                                        )
                                                    }
                                                >
                                                    승인취소
                                                </button>
                                                <Link
                                                    href={route(
                                                        "kr.mspc.creators.sponsorship.index",
                                                        { creatorSeq: item.seq }
                                                    )}
                                                    className="border-0 bg-teal-500 hover:bg-teal-400 py-1 px-2 text-gray-800 rounded transition-all text-white text-sm inline-block"
                                                >
                                                    후원정보
                                                </Link>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={creators.meta.links}
                    queryParams={queryParams}
                />
            </div>

            <Modal show={modalShow} onClose={closeModal} maxWidth="sm">
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        심사{data.status == "approve" ? "승인" : "취소"}
                    </h2>
                    <p className="mt-1 p-2 text-sm text-gray-600">
                        해당 크리에이터를 심사
                        {data.status == "approve" ? "승인" : "취소"} 하려고
                        합니다.
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
                                {data.status == "approve" ? "승인" : "취소"}
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;

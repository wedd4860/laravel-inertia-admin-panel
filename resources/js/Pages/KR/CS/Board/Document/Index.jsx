import OutlineLink from "@/Components/Icon/OutlineLink";
import { ListOnToast } from "@/Components/ListOnToast";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, documents, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.board.document.index"), queryParams);
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
        router.get(route("kr.cs.board.document.index"), queryParams);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="문서조회 : 전체 게시글 - index" />

            <div className="p-6 overflow-hidden shadow-sm">
                <div className="overflow-auto rounded border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <TableHeading
                                    name="document_srl"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">게시글번호</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">제목</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">내용</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">링크</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">공지</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">제목강조</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">제목색상</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">조회수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">좋아요</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">싫어요</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">댓글수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">파일수</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">작성자 ID</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">작성자</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        작성자 닉네임
                                    </div>
                                </th>
                                <TableHeading
                                    name="regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">작성일</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        마지막 수정자
                                    </div>
                                </th>
                                <TableHeading
                                    name="last_update"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">
                                        마지막 수정일
                                    </div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">글상태</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">댓글상태</div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="document_srl"
                                        defaultValue={queryParams.document_srl}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "document_srl",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("document_srl", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="title"
                                        defaultValue={queryParams.title}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("title", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="content"
                                        defaultValue={queryParams.content}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "content",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("content", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.is_notice}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "is_notice",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.title_bold}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "title_bold",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.title_color}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "title_color",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="user_id"
                                        defaultValue={queryParams.user_id}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "user_id",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("user_id", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="user_name"
                                        defaultValue={queryParams.user_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "user_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("user_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="nick_name"
                                        defaultValue={queryParams.nick_name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "nick_name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("nick_name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="last_updater"
                                        defaultValue={queryParams.last_updater}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "last_updater",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("last_updater", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.status}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "status",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="SECRET">SECRET</option>
                                        <option value="PUBLIC">PUBLIC</option>
                                        <option value="TEMP">TEMP</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={
                                            queryParams.comment_status
                                        }
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "comment_status",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="ALLOW">ALLOW</option>
                                        <option value="DENY">DENY</option>
                                    </SelectInput>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.data.map((item, index) => (
                                <tr
                                    key={`${item.member_srl}-${index}`}
                                    className="border-b"
                                >
                                    <td className="px-3 py-2 text-center">
                                        {item.document_srl}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.title}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.content}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <a
                                            href={item.document_link}
                                            target="_blank"
                                            className="inline-block"
                                        >
                                            <OutlineLink className="stroke-sky-500 size-4" />
                                        </a>
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {item.is_notice}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.title_bold}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.title_color}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.readed_count}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.voted_count}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.blamed_count}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.comment_count}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.uploaded_count}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.user_id}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-32">
                                        {item.user_name}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-32">
                                        {item.nick_name}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.regdate}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.last_updater}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.last_update}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.status}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {item.comment_status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={documents.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

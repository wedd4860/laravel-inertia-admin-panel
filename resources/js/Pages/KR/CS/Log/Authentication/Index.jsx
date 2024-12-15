import { ListOnToast } from "@/Components/ListOnToast";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

const Index = ({ auth, members, queryParams = null }) => {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("kr.cs.log.authentication.index"), queryParams);
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
        router.get(route("kr.cs.log.authentication.index"), queryParams);
    };

    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="projects" />

            <div className="p-6 overflow-hidden shadow-sm">
                <div className="overflow-auto rounded border">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-3">
                                    <div className="min-w-16">이름</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">생일</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">성별</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">fgnGbn</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">di</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">ci1</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">ci2</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">civersion</div>
                                </th>
                                <TableHeading
                                    name="reqNum"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">등록일</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">결과</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">
                                        본인인증 종류
                                    </div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">전화번호</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">통신사</div>
                                </th>
                                <TableHeading
                                    name="certDate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">인증시간</div>
                                </TableHeading>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">addVar</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">vDiscrNo</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">나이</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">ip</div>
                                </th>
                                <th className="px-3 py-3">
                                    <div className="min-w-24">authInfo</div>
                                </th>
                                <TableHeading
                                    name="regdate"
                                    sort_column={queryParams.sort_column}
                                    order_type={queryParams.order_type}
                                    sortChanged={sortChanged}
                                >
                                    <div className="min-w-16">등록일</div>
                                </TableHeading>
                            </tr>
                        </thead>
                        <thead className="uppercase border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="name"
                                        defaultValue={queryParams.name}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("name", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="birthday"
                                        defaultValue={queryParams.birthday}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "birthday",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("birthday", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.sex}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "sex",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="F">여자</option>
                                        <option value="M">남자</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full text-sm leading-4"
                                        defaultValue={queryParams.result}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "result",
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
                                        defaultValue={queryParams.certGb}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "certGb",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">선택</option>
                                        <option value="H">H</option>
                                        <option value="IPIN">IPIN</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="cellNo"
                                        defaultValue={queryParams.cellNo}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "cellNo",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("cellNo", e)
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput
                                        className="w-full text-sm leading-4"
                                        placeholder="ip"
                                        defaultValue={queryParams.ip}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "ip",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) => onKeyPress("ip", e)}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.data.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b text-center"
                                >
                                    <td className="px-3 py-2">{item.name}</td>
                                    <td className="px-3 py-2">
                                        {item.birthday}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.transSex}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.fgnGbn}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.di}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.ci1}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.ci2}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.civersion}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.reqNum}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.result}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.certGb}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.cellNo}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.cellCorp}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.certDate}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.addVar}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.vDiscrNo}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.age}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.ip}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.authInfo}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-56">
                                        {item.regdate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    links={members.meta.links}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

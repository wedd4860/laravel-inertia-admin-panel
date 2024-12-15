import Pagination from "@/Components/Pagination";
import TableTdCoin from "@/Components/MCoin/TableTdCoin";
import TableTdText from "@/Components/MCoin/TableTdText";
import TableThTitle from "@/Components/MCoin/TableThTitle";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Usage = ({ auth, items, queryParams }) => {
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="M코인조회 : 마상계정 사용내역 - show" />
            <div className="px-6 py-4 overflow-hidden border-b-2 border-gray-100">
                <Link
                    href={route("kr.cs.mcoin.masang.index")}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    목록
                </Link>
            </div>

            <div className="p-6 grid grid-cols-1 gap-3">
                <div className="rounded-lg shadow border cols-span-2">
                    <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                        <p className="font-bold uppercase">전체</p>
                    </div>
                    <div className="bg-gray-50 overflow-y-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-300">
                                <tr className="text-nowrap text-center">
                                    <TableThTitle title="프로덕트" />
                                    <TableThTitle title="구매방식" />
                                    <TableThTitle title="캐시종류" />
                                    <TableThTitle title="사용날짜" />
                                    <TableThTitle title="구매금액" />
                                    <TableThTitle title="상품명" />
                                    <TableThTitle title="유저IP" />
                                    <TableThTitle title="결과" />
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center bg-white">
                                {items.data.length > 0 ? (
                                    items.data.map((item, idx) => (
                                        <tr key={idx}>
                                            <TableTdText
                                                text={item.NM_SERVICE}
                                            />
                                            <TableTdText
                                                text={item.CD_PAYTYPE_NAME}
                                            />
                                            <TableTdText
                                                text={item.CASH_FLAG}
                                            />
                                            <TableTdText text={item.DATE_CHG} />
                                            <TableTdCoin mcoin={item.AMT_PAY} />
                                            <TableTdText text={item.NM_GOOD} />
                                            <TableTdText text={item.IP_USER} />
                                            <TableTdText
                                                text={item.CD_ACPT_RESULT_NAME}
                                            />
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <TableTdText
                                            colSpan="8"
                                            text="사용내역이 없습니다."
                                        />
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Pagination links={items.meta.links} queryParams={queryParams} />
        </AuthenticatedLayout>
    );
};
export default Usage;

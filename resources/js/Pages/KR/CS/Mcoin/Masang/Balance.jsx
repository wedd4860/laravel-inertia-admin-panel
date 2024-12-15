import TableTdCoin from "@/Components/MCoin/TableTdCoin";
import TableThTitle from "@/Components/MCoin/TableThTitle";
import AuthenticatedLayout from "@/Layouts/KR/CS/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Balance = ({ auth, items }) => {
    const handleGoBack = () => {
        window.history.back();
    };
    return (
        <AuthenticatedLayout member={auth.member}>
            <Head title="M코인조회 : 마상계정 잔액조회 - show" />
            <div className="px-6 py-4 overflow-hidden border-b-2 border-gray-100">
                <button
                    onClick={handleGoBack}
                    className="border-0 bg-sky-500 hover:bg-sky-400 py-1 px-2 text-gray-800 rounded transition-all text-white"
                >
                    목록
                </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-3">
                {items.data.map((item) => (
                    <div
                        key={item.product}
                        className="rounded-lg shadow border cols-span-2"
                    >
                        <div className="bg-gray-50 border-b-2 border-gray-500 p-3">
                            <p className="font-bold uppercase">
                                {item.product}
                            </p>
                        </div>
                        <div className="bg-gray-50 overflow-y-auto bg-white">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="text-xs uppercase bg-gray-50 border-b-2 border-gray-300">
                                    <tr className="text-nowrap text-center">
                                        <TableThTitle title="충전캐시 잔액" />
                                        <TableThTitle title="유료 잔액" />
                                        <TableThTitle title="선물 잔액" />
                                        <TableThTitle title="이벤트 잔액" />
                                        <TableThTitle title="YD 잔액" />
                                        <TableThTitle title="테스트 잔액" />
                                        <TableThTitle title="충전한도 잔액" />
                                        <TableThTitle title="합계" />
                                    </tr>
                                </thead>
                                <tbody className="text-xs text-center">
                                    <tr>
                                        <TableTdCoin
                                            mcoin={item.RemainCashShop}
                                        />
                                        <TableTdCoin
                                            mcoin={item.RemainCashContents}
                                        />
                                        <TableTdCoin
                                            mcoin={item.RemainCashBonus}
                                        />
                                        <TableTdCoin
                                            mcoin={item.RemainCashEtc}
                                        />
                                        <TableTdCoin
                                            mcoin={item.RemainMileageShop}
                                        />
                                        <TableTdCoin
                                            mcoin={item.RemainMileageContents}
                                        />
                                        <TableTdCoin mcoin={item.limitCash} />
                                        <TableTdCoin
                                            mcoin={
                                                item.RemainCashShop +
                                                item.RemainCashEtc +
                                                item.RemainMileageContents
                                            }
                                        />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};
export default Balance;

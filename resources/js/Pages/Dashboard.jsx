import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout member={auth.member} header="">
            <Head title="Dashboard" />

            <div className="relative rounded-xl overflow-auto p-6">
                <div className="relative">
                    <div className="relative columns-6 gap-6">
                        <div className="overflow-hidden rounded-lg text-center text-xs">
                            <Link
                                href={route("kr.cs.member.info.index")}
                                className=""
                            >
                                <img
                                    className="w-full object-cover transition hover:scale-125"
                                    src="https://web-files-tokyo-cdn.masangsoft.com/common/20240426/1714101876/b17dfe5515235164018b24e6c20b71e5.png"
                                />
                                CS_ADMIN
                            </Link>
                        </div>
                        <div className="relative mt-6 overflow-hidden rounded-lg text-center text-xs">
                            <Link
                                href={route("kr.mspc.creators.group.index")}
                                className=""
                            >
                                <img
                                    className="w-full object-cover transition hover:scale-125"
                                    src="https://web-files-tokyo-cdn.masangsoft.com/public/CS/images/faq_etc_img.png"
                                />
                                크리에이터즈
                            </Link>
                        </div>
                        <div className="relative mt-6 overflow-hidden rounded-lg text-center text-xs">
                            <Link
                                href={route("kr.gz.service.status.show")}
                                className=""
                            >
                                <img
                                    className="w-full object-cover transition hover:scale-125"
                                    src="https://web-files-tokyo-cdn.masangsoft.com/public/CS/images/faq_gz_img.png"
                                />
                                건즈
                            </Link>
                        </div>
                        <div className="relative mt-6 overflow-hidden rounded-lg text-center text-xs">
                            <Link
                                href={route("kr.nx.service.status.show")}
                                className=""
                            >
                                <img
                                    className="w-full object-cover transition hover:scale-125"
                                    src="https://web-files-tokyo-cdn.masangsoft.com/public/CS/images/faq_nx_img.png"
                                />
                                능력자 X
                            </Link>
                        </div>
                        <div className="relative mt-6 overflow-hidden rounded-lg text-center text-xs">
                            <Link
                                href={route("kr.lh.service.status.show")}
                                className=""
                            >
                                <img
                                    className="w-full object-cover transition hover:scale-125"
                                    src="https://web-files-tokyo-cdn.masangsoft.com/public/CS/images/faq_lh_img.png"
                                />
                                라그하임
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import OutlineWrenchScrewdriver from "@/Components/Icon/OutlineWrenchScrewdriver";
import LogoCtrlhub from "@/Components/Icon/LogoCtrlhub";
import useStoreMenu from "@/Stores/useStoreMenu";
import OutlineArrowDownTray from "@/Components/Icon/OutlineArrowDownTray";

export default function AuthenticatedLayout({ member, header, children }) {
    const { menuShow, setMenuShow } = useStoreMenu();
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { url } = usePage();

    function handleSideMenu() {
        setMenuShow(!menuShow);
    }

    function isPage(parentUrl, pattern) {
        const strUrl = url; // 현재 페이지의 URL 경로
        if (strUrl.startsWith(parentUrl)) {
            if (pattern == "fix") {
                if (strUrl != parentUrl) {
                    return false;
                }
            }
            return true;
        } else {
            if (pattern) {
                const regex = new RegExp(pattern); // 패턴을 정규 표현식으로 변환
                return regex.test(strUrl); // 패턴과 URL 비교
            }
        }
        return false;
    }

    return (
        <div className="min-h-screen">
            <div className="sticky top-0 w-full z-9 border-b">
                <nav className="border-b border-gray-200 bg-gray-100">
                    <div className="mx-auto px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <LogoCtrlhub className="size-12 mt-1" />
                                    </Link>
                                </div>

                                <div className="space-x-8 -my-px ms-10 flex">
                                    <NavLink href={route("dashboard")}>
                                        DASHBOARD
                                    </NavLink>
                                    <NavLink
                                        href={route("kr.cs.member.info.index")}
                                        active="true"
                                    >
                                        CS ADMIN
                                    </NavLink>
                                </div>
                            </div>

                            <div className=" flex items-center ms-6">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {member.user_name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                내정보
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                로그아웃
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
            </div>

            <div>
                <div
                    className={
                        `${menuShow ? "block" : "hidden"}` +
                        " fixed z-8 top-[65px] w-[250px] overflow-y-auto h-[calc(100%-65px)] pl-8 border-gray-200 border-r-[1px]"
                    }
                >
                    <ul>
                        <li className="mt-8">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        계정조회
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/cs/member/info",
                                                "^/kr/cs/member/\\d+/info/"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.member.info.index")}>
                                    <font className="align-middle">
                                        마상계정
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                            ${
                                isPage(
                                    "/kr/cs/member/expired",
                                    "^/kr/cs/member/\\d+/expired/"
                                )
                                    ? "border-sky-500 text-sky-500 font-semibold"
                                    : ""
                            }`}
                            >
                                <Link
                                    href={route("kr.cs.member.expired.index")}
                                >
                                    <font className="align-middle">
                                        휴먼계정
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                            ${
                                isPage(
                                    "/kr/cs/member/restore",
                                    "^/kr/cs/member/\\d+/restore/"
                                )
                                    ? "border-sky-500 text-sky-500 font-semibold"
                                    : ""
                            }`}
                            >
                                <Link
                                    href={route("kr.cs.member.restore.index")}
                                >
                                    <font className="align-middle">
                                        복구계정
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                            ${
                                isPage(
                                    "/kr/cs/member/test-info",
                                    "^/kr/cs/member/[a-zA-Z0-9\\-_]+/test-info/"
                                )
                                    ? "border-sky-500 text-sky-500 font-semibold"
                                    : ""
                            }`}
                            >
                                <Link href={route("kr.cs.member.test.index")}>
                                    <font className="align-middle">
                                        테스트계정
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        M코인조회
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/cs/mcoin/masang",
                                                "^/kr/cs/mcoin/\\d+/masang/"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.mcoin.masang.index")}>
                                    <font className="align-middle">
                                        마상계정
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        로그관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/log/login")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.log.login.index")}>
                                    <font className="align-middle">
                                        로그인 로그
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/log/authentication")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route(
                                        "kr.cs.log.authentication.index"
                                    )}
                                >
                                    <font className="align-middle">
                                        본인인증 로그
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        차단관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/block/ip")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.block.ip.index")}>
                                    <font className="align-middle">IP차단</font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/cs/block/hacked",
                                                "/kr/cs/block/\\d+/hacked"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.block.hacked.index")}>
                                    <font className="align-middle">
                                        해킹계정차단
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/block/phone")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.block.phone.index")}>
                                    <font className="align-middle">
                                        전화번호차단
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/block/cs/abroad")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.block.abroad.show")}>
                                    <font className="align-middle">
                                        해외IP차단 ON/OFF
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        고객보안관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/security/service")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route("kr.cs.security.service.index")}
                                >
                                    <font className="align-middle">
                                        전화/OTP/해외IP차단
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/security/pc")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.security.pc.index")}>
                                    <font className="align-middle">
                                        지정 PC
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        배너/슬라이드 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/cs/banner/main",
                                                "/kr/cs/banner/\\d+/main"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.banner.main.index")}>
                                    <font className="align-middle">
                                        고객센터 메인슬라이드
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        쿠폰 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/cs/coupon/event",
                                                "/kr/cs/coupon/\\d+/(event|number)/",
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.coupon.event.index")}>
                                    <font className="align-middle">
                                        쿠폰 시스템
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/coupon/number")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.coupon.number.index")}>
                                    <font className="align-middle">
                                        쿠폰 사용 로그
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        링크관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/cs/link/launcher",
                                                "/kr/cs/link/\\d+/launcher"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.link.launcher.index")}>
                                    <font className="align-middle">
                                        마상소프트런처
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        권한관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/cs/permission/prime",
                                                "/kr/cs/permission/\\d+/prime"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route("kr.cs.permission.prime.index")}
                                >
                                    <font className="align-middle">
                                        관리자 권한
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        문서조회
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/board/document")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route("kr.cs.board.document.index")}
                                >
                                    <font className="align-middle">
                                        전체 게시글
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/cs/board/comment")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.cs.board.comment.index")}>
                                    <font className="align-middle">
                                        전체 댓글
                                    </font>
                                </Link>
                            </li>
                        </ul>
                    </ul>
                </div>

                <div className={menuShow ? "pl-[250px]" : ""}>
                    <main>
                        <div className="static">
                            <button
                                onClick={handleSideMenu}
                                className="absolute top-1/2 text-xs font-black w-5 p-[1px] h-7 flex items-center justify-center rounded-r-lg mt-0 border border-gray-300 border-l-0 text-gray-400 bg-white"
                            >
                                <OutlineArrowDownTray
                                    className={`${
                                        menuShow ? "rotate-90" : "-rotate-90"
                                    }`}
                                    strokeWidth="2"
                                />
                            </button>
                        </div>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

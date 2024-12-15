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
import OutlineLink from "@/Components/Icon/OutlineLink";

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
                                        href={route(
                                            "kr.lh.service.status.show"
                                        )}
                                        active="true"
                                    >
                                        LH ADMIN
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
                                        게임 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/service/status")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.service.status.show")}>
                                    <font className="align-middle">
                                        게임스타트 상태
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        링크 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/link/redirect")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.link.redirect.edit")}>
                                    <font className="align-middle">
                                        인트로 리다이렉트
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/link/general/download"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route("kr.lh.link.download.edit", {
                                        server: "general",
                                    })}
                                >
                                    <font className="align-middle">
                                        다운로드(일반서버)
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/link/test/download")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route("kr.lh.link.download.edit", {
                                        server: "test",
                                    })}
                                >
                                    <font className="align-middle">
                                        다운로드(테스트서버)
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        차단 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/block/account")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.block.account.index")}>
                                    <font className="align-middle">
                                        마상 계정
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        초기화 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/reset/second-password")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.reset.second.password.index")}>
                                    <font className="align-middle">
                                        2차 비밀번호 초기화
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        회원 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                ${
                                    isPage(
                                        "/kr/lh/user/point",
                                        "^/kr/lh/user/\\d+/point"
                                    )
                                        ? "border-sky-500 text-sky-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Link href={route("kr.lh.user.point.index")}>
                                    <font className="align-middle">
                                        라그하임포인트(LP)
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                ${
                                    isPage("/kr/lh/user/transfer")
                                        ? "border-sky-500 text-sky-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Link href={route("kr.lh.user.transfer.index")}>
                                    <font className="align-middle">
                                        이관 현황 관리
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                ${
                                    isPage("/kr/lh/user/oldaccount")
                                        ? "border-sky-500 text-sky-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Link href={route("kr.lh.user.oldaccount.index")}>
                                    <font className="align-middle">
                                        바른손 계정 관리
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        배너관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/banner/main",
                                                "^/kr/lh/banner/\\d+/main"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.banner.main.index")}>
                                    <font className="align-middle">
                                        메인 배너
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/banner/sub",
                                                "^/kr/lh/banner/\\d+/sub"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.banner.sub.index")}>
                                    <font className="align-middle">
                                        서브 배너
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">통계</font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/statistics/connect")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route(
                                        "kr.lh.statistics.connect.show",
                                        { type: "connect" }
                                    )}
                                >
                                    <font className="align-middle">
                                        동시접속자
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/statistics/max-connect"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route(
                                        "kr.lh.statistics.connect.show",
                                        { type: "max-connect" }
                                    )}
                                >
                                    <font className="align-middle">
                                        MAX 동시접속자
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        이벤트 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/event/integration/management",
                                                "^/kr/lh/event/integration/\\d+/(management|reward|select|receive)/"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route(
                                        "kr.lh.event.integration.management.index"
                                    )}
                                >
                                    <font className="align-middle">
                                        통합 이벤트
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/event/integration/manual",
                                                "^/kr/lh/event/integration/\\d+/manual"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route(
                                        "kr.lh.event.integration.manual.index"
                                    )}
                                >
                                    <font className="align-middle">
                                        통합 이벤트 보상 수동 지급
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/event/attend/duration"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route(
                                        "kr.lh.event.attend.duration.index"
                                    )}
                                >
                                    <font className="align-middle">
                                        상시 출석 설정
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/event/attend/reward",
                                                "^/kr/lh/event/attend/(reward/create|\\d+/reward/edit)"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link
                                    href={route(
                                        "kr.lh.event.attend.reward.index"
                                    )}
                                >
                                    <font className="align-middle">
                                        상시 출석 보상 관리
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        라그샵 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/shop/cash",
                                                "^/kr/lh/shop/\\d+/cash"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.shop.cash.index")}>
                                    <font className="align-middle">
                                        캐시샵 아이템
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/lh/shop/lp",
                                                "^/kr/lh/shop/\\d+/lp"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.shop.lp.index")}>
                                    <font className="align-middle">
                                        L.P MALL 아이템
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        로그 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/log/attend")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.log.attend.index")}>
                                    <font className="align-middle">
                                        상시 출석
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/log/cash")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.log.cash.index")}>
                                    <font className="align-middle">
                                        캐시샵 구매
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/log/ingame")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.log.ingame.index")}>
                                    <font className="align-middle">
                                        인게임 캐시 보관함
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/log/return")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.log.return.index")}>
                                    <font className="align-middle">
                                        복귀자 아이템 구매
                                    </font>
                                </Link>
                            </li>
                        </ul>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/lh/log/move")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.lh.log.move.index")}>
                                    <font className="align-middle">
                                        계정이동권 사용
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                ${
                                    isPage("/kr/lh/log/gamestart")
                                        ? "border-sky-500 text-sky-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Link href={route("kr.lh.log.gamestart.index")}>
                                    <font className="align-middle">
                                        게임스타트
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                ${
                                    isPage("/kr/lh/log/rpcgame")
                                        ? "border-sky-500 text-sky-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Link href={route("kr.lh.log.rpcgame.index")}>
                                    <font className="align-middle">
                                        가위바위보
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

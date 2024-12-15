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
                                            "kr.fh.service.status.show"
                                        )}
                                        active="true"
                                    >
                                        FH ADMIN
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
                                        서비스 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/fh/service/status")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.fh.service.status.show")}>
                                    <font className="align-middle">
                                        서비스 상태
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
                                            isPage("/kr/fh/link/redirect")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.fh.link.redirect.edit")}>
                                    <font className="align-middle">
                                        인트로 리다이렉트
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        팝업 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage("/kr/fh/popup/info")
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.fh.popup.info.edit")}>
                                    <font className="align-middle">
                                        팝업 정보
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        배너 관리
                                    </font>
                                </font>
                            </h5>
                        </li>
                        <ul className="text-slate-500 border-slate-200">
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/fh/banner/main",
                                                "^/kr/fh/banner/\\d+/main/"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.fh.banner.main.index")}>
                                    <font className="align-middle">
                                        메인 배너
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                ${
                                    isPage(
                                        "/kr/fh/banner/sub",
                                        "^/kr/fh/banner/\\d+/sub/"
                                    )
                                        ? "border-sky-500 text-sky-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Link href={route("kr.fh.banner.sub.index")}>
                                    <font className="align-middle">
                                        서브 배너
                                    </font>
                                </Link>
                            </li>
                            <li
                                className={`text-sm py-1 border-l pl-4 hover:border-sky-500 hover:text-sky-500
                                        ${
                                            isPage(
                                                "/kr/fh/banner/bottomright",
                                                "^/kr/fh/banner/\\d+/bottomright/"
                                            )
                                                ? "border-sky-500 text-sky-500 font-semibold"
                                                : ""
                                        }`}
                            >
                                <Link href={route("kr.fh.banner.bottomright.index")}>
                                    <font className="align-middle">
                                        메인 우측 하단 배너
                                    </font>
                                </Link>
                            </li>
                        </ul>

                        <li className="mt-1">
                            <h5 className="mb-2 font-semibold text-slate-900">
                                <font className="align-middle">
                                    <font className="align-middle">
                                        <a
                                            href="https://www.masanggames.co.kr/SITE_BANNER"
                                            target="_blank"
                                            className="inline-block"
                                        >
                                            배너 업로드 <OutlineLink className="inline stroke-black-500 size-3" />
                                        </a>
                                    </font>
                                </font>
                            </h5>
                        </li>
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

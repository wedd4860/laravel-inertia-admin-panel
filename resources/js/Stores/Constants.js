const KR_PERMISSION_GROUP = [
    "ALL",
    "CS",
    "DK",
    "LH",
    "PT",
    "FH",
    "GZ",
    "AO",
    "NCC",
    "SR",
    "NX",
    "AI",
    "MSPC", // 정식 프로덕트가 아닌경우 접두사 MS를 붙이자
];

const KR_CREATOR_GROUP = [
    { id: 1, name: "AO" },
    { id: 2, name: "FH" },
    { id: 3, name: "NX" },
    { id: 4, name: "GZ" },
    { id: 5, name: "DK" },
    { id: 6, name: "PT" },
    { id: 7, name: "SR" },
    { id: 8, name: "CC" },
    { id: 10, name: "LH" },
];

const KR_SITE_NUMBER_GROUP = [
    { id: 0, name: "공통" },
    { id: 1, name: "마상소프트" },
    { id: 2, name: "문피아" },
    { id: 3, name: "피카온" },
    { id: 4, name: "오로바둑" },
    { id: 5, name: "다음" },
    { id: 6, name: "온게이트" },
    { id: 7, name: "한게임" },
];

const KR_NX_CHANNELING_SITE_GROUP = [
    0, 1, 3, 6
];
const KR_FH_CHANNELING_SITE_GROUP = [
    0, 1, 3, 4, 6
];

const KR_LH_EVENT_TYPE_GROUP = [
    { id: 1, name: "레벨 달성" },
    { id: 2, name: "출석 / 일일 보상" },
];

const KR_LH_SHOP_TYPE_GROUP = [
    { id: 1, name: "추천상품" },
    { id: 2, name: "프리미엄 서비스" },
    { id: 3, name: "아이템" },
    { id: 4, name: "캐릭터" },
];

export {
    KR_PERMISSION_GROUP,
    KR_CREATOR_GROUP,
    KR_SITE_NUMBER_GROUP,
    KR_NX_CHANNELING_SITE_GROUP,
    KR_FH_CHANNELING_SITE_GROUP,
    KR_LH_EVENT_TYPE_GROUP,
    KR_LH_SHOP_TYPE_GROUP,
};

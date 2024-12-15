import {
    formatDateLocal,
    calculateElapsedTime,
    isTimestampInCurrentOneClockHour,
} from "@/Helper/date";
import { loadFromSessionStorage, saveToSessionStorage } from "@/Helper/utils";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const inquiryDTO = (d) => {
    return {
        id: +d.id,
        inquiry_type: d.inquiry_type,
        assigned_manager: d.assigned_manager,
        inquiry_status: d.inquiry_status,
        product: d.product,
        reg_date: formatDateLocal(new Date(d.reg_date)),
        elapsed_time: calculateElapsedTime(d.reg_date, d.update_date),
        satisfy_rate: +d.satisfy_rate,
    };
};

export const useFetchStatistics = (initStart, initEnd) => {
    const [fetchedData, setFetchedData] = useState([]);
    const fetchData = async (start, end) => {
        if (typeof start !== "string" || typeof end !== "string") return;
        const sessionStorageKey = `${start.replaceAll(
            ".",
            "-"
        )}&${end.replaceAll(".", "-")}`;

        const fetchPromise = () =>
            axios
                .get("/app-api/kr/st/inquiry", {
                    params: {
                        start: start.replaceAll(".", "-"),
                        end: end.replaceAll(".", "-"),
                    },
                })
                .then((res) => {
                    const rawData = res.data.data.map(inquiryDTO);
                    try {
                        saveToSessionStorage(sessionStorageKey, rawData);
                    } catch (e) {
                        if (e instanceof DOMException && e.code === 22) {
                            console.error(
                                "sessionStorage 용량 초과로 인해 데이터를 저장할 수 없습니다."
                            );
                        }
                    }
                    return rawData;
                })
                .then(setFetchedData)
                .catch((err) => {
                    if (err.response?.status === 401) {
                        router.get("/login");
                    } else if (err.response?.status === 500) {
                        window.alert("데이터 조회에 실패 했습니다.");
                    }
                });

        const sessionData = loadFromSessionStorage(sessionStorageKey);
        if (
            sessionData &&
            isTimestampInCurrentOneClockHour(sessionData.updated_at)
        ) {
            setFetchedData(sessionData.data);
        } else {
            await fetchPromise();
        }
    };

    useEffect(() => {
        const main = async () => {
            await fetchData(initStart, initEnd);
        };
        main();
        return () => {};
    }, []);

    return { fetchedData, fetchData };
};

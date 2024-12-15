import { useEffect, useState } from "react";

export const MemberGroupButton = ({ group_srl, className = "" }) => {
    const [groupName, setGroupName] = useState(null);

    useEffect(() => {
        let groupTitle = "관리자문의";
        const groupSrl = parseInt(group_srl);
        switch (groupSrl) {
            case 2:
                groupTitle = "관리그룹";
                break;
            case 3:
                groupTitle = "준회원";
                break;
            case 4:
                groupTitle = "정회원";
                break;
            case 385:
                groupTitle = "탈퇴회원";
                break;
            case 386:
                groupTitle = "불량회원";
                break;
            case 5385:
                groupTitle = "게임불가";
                break;
        }
        setGroupName(groupTitle);
    }, [group_srl]);
    return <button className={className}>{groupName}</button>;
};

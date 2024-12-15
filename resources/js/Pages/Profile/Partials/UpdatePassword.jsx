import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function UpdatePassword({ isSocial = "N" }) {
    if (isSocial == "Y") {
        return null;
    }
    return (
        <div className="p-4 sm:p-8 bg-white border shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
        </div>
    );
}

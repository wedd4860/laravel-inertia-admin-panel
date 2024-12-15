import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UpdatePassword from "./Partials/UpdatePassword";
import UpdateProfileInformation from "./Partials/UpdateProfileInformation";

export default function Edit({ auth, isSocial, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            member={auth.member}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    내정보
                </h2>
            }
        >
            <Head title="내정보" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <UpdateProfileInformation
                        isSocial={isSocial}
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                    <UpdatePassword isSocial={isSocial} />

                    {/* <div className="p-4 sm:p-8 bg-white border shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

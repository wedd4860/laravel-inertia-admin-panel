import UpdateProfileInformationForm from "./UpdateProfileInformationForm";

export default function UpdateProfileInformation({
    isSocial,
    mustVerifyEmail,
    status,
}) {
    return (
        <div className="p-4 sm:p-8 bg-white border shadow sm:rounded-lg">
            <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                isSocial={isSocial}
                className="max-w-xl"
            />
        </div>
    );
}

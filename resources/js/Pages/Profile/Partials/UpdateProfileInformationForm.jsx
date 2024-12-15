import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    isSocial = "N",
    mustVerifyEmail,
    status,
    className = "",
}) {
    const member = usePage().props.auth.member;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            user_name: member.user_name || null,
            nick_name: member.nick_name || null,
            email_address: member.email_address || null,
            password: null,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    내정보 수정
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    유저이름, 닉네임, 이메일을 수정 할 수 있습니다.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="user_name" value="유저 이름" />
                    <TextInput
                        id="user_name"
                        type="text"
                        name="user_name"
                        value={data.user_name}
                        className="mt-1 border-gray-300 w-full text-sm leading-4"
                        onChange={(e) => setData("user_name", e.target.value)}
                    />
                    <InputError message={errors.user_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="nick_name" value="닉네임" />
                    <TextInput
                        id="nick_name"
                        type="text"
                        name="nick_name"
                        value={data.nick_name}
                        className="mt-1 border-gray-300 w-full text-sm leading-4"
                        onChange={(e) => setData("nick_name", e.target.value)}
                    />
                    <InputError message={errors.nick_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email_address" value="이메일" />
                    <TextInput
                        id="email_address"
                        type="text"
                        name="email_address"
                        value={data.email_address}
                        className="mt-1 w-full text-sm leading-4 border rounded p-2 bg-gray-100 text-gray-500 cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        disabled
                    />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>수정</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

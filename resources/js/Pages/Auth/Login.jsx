import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import LoginButton from "@/Components/LoginButton";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    const handleGoogleLogin = () => {
        window.location.href = "/login/google";
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <form onSubmit={submit} className="px-6 py-4">
                <div>
                    <InputLabel htmlFor="user_id" value="마상소프트 ID" />

                    <TextInput
                        id="user_id"
                        type="text"
                        name="user_id"
                        value={data.user_id}
                        placeholder="마상소프트 ID를 입력해 주세요."
                        className="mt-1 block w-full"
                        autoComplete="user_id"
                        isFocused={true}
                        onChange={(e) => setData("user_id", e.target.value)}
                    />

                    <InputError message={errors.user_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="비밀번호" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="비밀번호를 입력해 주세요."
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex mt-4 mb-1">
                    {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                    <LoginButton
                        type="button"
                        className="w-1/2 items-center justify-center text-center bg-[#EA4335] hover:bg-red-600 focus:bg-red-600 active:bg-red-800"
                        onClick={handleGoogleLogin}
                        disabled={processing}
                    >
                        구글 로그인
                    </LoginButton>

                    <LoginButton
                        type="submit"
                        className="w-1/2 items-center justify-center ml-2 bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
                        disabled={processing}
                    >
                        마상 로그인
                    </LoginButton>
                </div>
            </form>

            <div className="text-center text-gray-400 text-sm py-1 bg-gray-200">
                controller hub
            </div>
        </GuestLayout>
    );
}

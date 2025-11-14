// Components
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { Head, Link } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    // return (
    //     <AuthLayout
    //         title="Verify email"
    //         description="Please verify your email address by clicking on the link we just emailed to you."
    //     >
    //         <Head title="Email verification" />

    //         {status === 'verification-link-sent' && (
    //             <div className="mb-4 text-center text-sm font-medium text-green-600">
    //                 A new verification link has been sent to the email address
    //                 you provided during registration.
    //             </div>
    //         )}

    //         <Form {...send.form()} className="space-y-6 text-center">
    //             {({ processing }) => (
    //                 <>
    //                     <Button disabled={processing} variant="secondary">
    //                         {processing && <Spinner />}
    //                         Resend verification email
    //                     </Button>

    //                     <TextLink
    //                         href={logout()}
    //                         className="mx-auto block text-sm"
    //                     >
    //                         Log out
    //                     </TextLink>
    //                 </>
    //             )}
    //         </Form>
    //     </AuthLayout>
    // );

    return (
        <AuthLayout
            title="Verifikasi Akun Sedang Ditinjau"
            description="Terima kasih telah melakukan pendaftaran. "
        >
            <Head title="Verifikasi Akun" />

            <div className="space-y-4 text-center">
                <div className="text-gray-700">
                    Kami akan mengaktifkan akun Anda setelah proses peninjauan
                    selesai. Proses ini biasanya memakan waktu beberapa saat.
                </div>

                <div className="pt-6">
                    <Link
                        href={logout()}
                        className="mx-auto block rounded-md bg-red-600 px-3 py-2 text-sm text-gray-50 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Keluar
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}

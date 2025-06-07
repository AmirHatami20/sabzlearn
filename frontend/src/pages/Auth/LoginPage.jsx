import AuthLayout from "../../layout/AuthLayout.jsx";
import AuthForm from "../../components/Form/AuthForm.jsx";

function LoginPage() {
    return (
        <AuthLayout>
            <AuthForm
                mode="login"
                title="ورود با موبایل"
                subTitle="حساب کاربری ندارید؟"
                linkTitle="ثبت ‌نام کنید"
                linkHref="/register"
            />
        </AuthLayout>
    );
}

export default LoginPage;

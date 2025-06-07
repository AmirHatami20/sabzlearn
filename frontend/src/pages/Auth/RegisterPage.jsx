import AuthLayout from "../../layout/AuthLayout.jsx";
import AuthForm from "../../components/Form/AuthForm.jsx";

function LoginPage() {
    return (
        <AuthLayout>
            <AuthForm
                mode="register"
                title="عضویت"
                subTitle="قبلا ثبت نام کرده اید؟"
                linkTitle="وارد شوید"
                linkHref="/login"
            />
        </AuthLayout>
    );
}

export default LoginPage;

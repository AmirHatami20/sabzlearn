import {useContext, useRef, useState} from "react";

import {PiPhoneLight} from "react-icons/pi";
import {HiOutlineUser} from "react-icons/hi2";
import {CiLock, CiMail} from "react-icons/ci";
import {FaArrowLeft} from "react-icons/fa";

import {useForm} from "../../hooks/useForm.js";
import {Link, useNavigate} from "react-router-dom";
import {toEnglishDigits, toPersianNumber} from "../../utils/helper.js";

import AuthInput from "./AuthInput.jsx";
import Toast from "../Toast.jsx";

import {API_PATHS} from "../../utils/apiPaths.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useAxios} from "../../hooks/useAxios.js";

function AuthForm({mode, title, linkTitle, subTitle, linkHref}) {
    // Get Fields
    const getFields = (mode) => {
        if (mode === "login") {
            return [
                {name: "email", placeholder: "آدرس ایمیل", icon: CiMail, type: "email"},
            ];
        }

        return [
            {name: "username", placeholder: "نام کاربری", icon: HiOutlineUser, type: "text"},
            {name: "phone", placeholder: "شماره موبایل", icon: PiPhoneLight, type: "text"},
            {name: "email", placeholder: "آدرس ایمیل", icon: CiMail, type: "email"},
            {name: "password", placeholder: "رمز عبور", icon: CiLock, type: "password"}
        ];
    };

    const initialInputs = Object.fromEntries(
        getFields(mode).map(field => [field.name, {value: "", isValid: false}])
    );

    const {formState, onInputHandler} = useForm(initialInputs);

    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const {login} = useContext(AuthContext)

    const [toast, setToast] = useState(null); // type , message
    const [step, setStep] = useState("credentials");

    const {request, loading} = useAxios()

    // Go to next step
    const handleBack = () => setStep("credentials");

    // Show toast
    const showToast = (toastData) => {
        setToast(null);
        setTimeout(() => setToast(toastData), 50);
    };

    // Go to next input
    const newInputHandler = (e, index) => {
        const val = e.target.value;

        // Check input is number
        if (/^\d$/.test(val)) {
            inputRefs.current[index].value = toPersianNumber(val);

            if (index < inputRefs.current.length - 1) { // index < 4
                inputRefs.current[index + 1].focus();
            } else {
                // User fill last input
                setTimeout(() => {
                    handleSubmit(new Event("submit"));
                }, 100);
            }
        } else {
            e.target.value = "";
        }
    };

    // Go to Prev Input
    const prevInputHandler = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(
            Object.entries(formState.inputs).map(([key, val]) => [key, val.value])
        );

        if (step === "credentials") {
            try {
                await request({
                    url: API_PATHS.AUTH[mode.toUpperCase()],
                    method: "POST",
                    data: formData
                });
                showToast({type: "success", message: "کد تایید به ایمیل وارد شده ارسال شد."});
                setStep("code");
            } catch (err) {
                showToast({type: "error", message: err.response?.data?.message});
            }
        }

        if (step === "code") {
            // Gather code
            const code = toEnglishDigits(inputRefs.current.map(ref => ref.value).join(""));

            try {
                const res = await request({
                    url: API_PATHS.AUTH.VERIFY,
                    method: "POST",
                    data: {
                        email: formData.email,
                        code,
                        mode,
                        ...(mode === "register" && {
                            username: formData.username,
                            phone: formData.phone,
                            password: formData.password
                        })
                    }
                });
                showToast({type: "success", message: res.data.message});
                login(res.data.user, res.data.token);
                localStorage.removeItem("otp_expiry");
                navigate("/");
            } catch (err) {
                showToast({type: "error", message: err.response?.data?.message || "کد تایید اشتباه است"});
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {step === "credentials" && (
                <>
                    <h4 className="font-dana-bold text-xl mb-4">{title}</h4>
                    <p className="mb-4">
                        {subTitle}{" "}
                        <Link to={linkHref} className="text-primary">
                            {linkTitle}
                        </Link>
                    </p>

                    {getFields(mode).map(({name, placeholder, icon, type = "text"}) => (
                        <AuthInput
                            key={name}
                            name={name}
                            placeholder={placeholder}
                            value={formState.inputs[name].value}
                            onInputHandler={onInputHandler}
                            icon={icon}
                            type={type}
                            isValid={formState.inputs[name].isValid}
                        />
                    ))}
                </>
            )}

            {step === "code" && (
                <>
                    <div className="flex justify-between items-center">
                        <h4 className="font-dana-bold text-xl">
                            کد تایید
                        </h4>
                        <button
                            onClick={handleBack}
                            className="p-1 bg-slate-500 rounded-full text-white"
                        >
                            <FaArrowLeft className="w-3.5 h-3.5"/>
                        </button>
                    </div>
                    <span className="block text-center my-4 font-dana-light">
                        کد تایید برای {formState.inputs.email.value} ارسال شد.
                    </span>
                    <div
                        className="flex justify-between mb-4 md:mb-4.5"
                        dir="ltr"
                    >
                        {Array(5).fill(0).map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => inputRefs.current[index] = el}
                                onInput={(e) => {
                                    newInputHandler(e, index)
                                }}
                                onKeyDown={(e) => {
                                    prevInputHandler(e, index)
                                }}
                                className="w-13 h-13 bg-gray-100 dark:bg-secendery-dark focus:outline-1 text-center rounded-[10px] text-lg"
                                type="text"
                                maxLength='1'
                                inputMode="numeric"
                                required
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>
                </>
            )}

            <button
                type="submit"
                className={`w-full text-white py-3 rounded-md ${formState.isFormValid || loading ? "bg-primary" : "bg-red-500/80 cursor-not-allowed"}`}
                disabled={!formState.isFormValid || loading}
            >
                {loading ? "در حال پردازش..." : step === "credentials" ? "ادامه" : "تایید"}
            </button>

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    duration={3000}
                />
            )}
        </form>
    );
}

export default AuthForm;

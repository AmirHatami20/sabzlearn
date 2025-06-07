import React from 'react';

function AuthInput(
    {
        name,
        type,
        value,
        placeholder,
        icon: Icon,
        isValid,
        onInputHandler
    }
) {
    const regex = {
        email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        phone: /^09\d{9}$/,
        password: /^(?=.*\d)[A-Za-z\d]{8,}$/
    }

    const onChangeHandler = (e) => {
        const value = e.target.value;

        let isValidField = value.trim().length >= 3;

        if (name === "email") {
            isValidField = regex.email.test(value);

        } else if (name === "phone") {
            isValidField = regex.phone.test(value);

        } else if (name === "password") {
            isValidField = regex.password.test(value);
        }

        onInputHandler(name, value, isValidField);
    };
    return (
        <div className="relative mb-4 md:mb-4.5">
            <input
                className={`auth-input ${isValid ? "border-primary" : "border-red-500/80 dark:border-red-500/50"}`}
                type={type}
                name={name}
                value={value}
                autoComplete="new-password" // Prevent from auto complete fields
                onChange={onChangeHandler}
                placeholder={placeholder}
            />
            {Icon && <Icon className="w-5 h-6 absolute left-3 top-0 bottom-0 my-auto dark:text-[#64748b]"/>}
        </div>
    );
}

export default AuthInput;
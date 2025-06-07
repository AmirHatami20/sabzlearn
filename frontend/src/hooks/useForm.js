import {useCallback, useReducer} from "react";

// Custom Hook
export const useForm = (initialInputs) => {
    // Reducer
    const formReducer = (state, action) => {
        switch (action.type) {
            case "INPUT_CHANGE": {
                // Update input
                const updatedInputs = {
                    ...state.inputs,
                    [action.inputID]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                };

                // Check all fields validation
                const isFormValid = Object.keys(updatedInputs).every(
                    (key) => updatedInputs[key].isValid
                );

                return {
                    inputs: updatedInputs,
                    isFormValid,
                };
            }
            default:
                return state;
        }
    };

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isFormValid: false,
    });

    // Change input value
    const onInputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            inputID: id,
            value,
            isValid,
        });
    }, []);

    return {formState, onInputHandler};
};

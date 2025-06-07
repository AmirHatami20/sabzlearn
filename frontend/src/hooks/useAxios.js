import {useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";

export const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async ({url, method, data, params, headers = {}}) => {
        setLoading(true);

        try {
            return await axiosInstance({
                url,
                method,
                data,
                params,
                headers
            });
        } catch (err) {
            setError(err?.response?.data?.message || "خطایی رخ داده است.");
            throw err;
        } finally {
            setLoading(false);
        }
    }
    return {request, loading, error};
}
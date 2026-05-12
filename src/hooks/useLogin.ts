import { useState } from "react";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import { useSnackbar } from "../components/SnackbarContext";


export function useLogin() {
    const { showSnackbar } = useSnackbar();
    const loginAction = useAuthStore((s) => s.loginAction);

    const [form, setForm] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});

    const handleLogin = async () => {
        setIsSubmitting(true);
        setServerErrors({});

        try {
            const res = await authService.login(form.email, form.password);
            loginAction(res);
            showSnackbar(`Selamat datang, ${res.fullName}`, "success");
        } catch (err: any) {
            const responseData = err.response?.data;

            if (responseData?.errors) {
                setServerErrors(responseData.errors);
                showSnackbar("Validasi gagal, periksa input Anda", "error");
            }
            else if (responseData?.message) {
                showSnackbar(responseData.message, "error");
            }
            else {
                showSnackbar("Terjadi kesalahan pada server", "error");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        setForm,
        isSubmitting,
        serverErrors,
        handleLogin,
    };
}

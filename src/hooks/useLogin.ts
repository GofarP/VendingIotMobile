import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import { useSnackbar } from "../components/SnackbarContext";

export function useLogin() {
    const { showSnackbar } = useSnackbar();
    const loginAction = useAuthStore((s) => s.loginAction);

    const [form, setForm] = useState({ email: "", password: "" });
    const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});

    const mutation = useMutation({
        mutationFn: () => authService.login(form.email, form.password),

        onSuccess: (res) => {
            loginAction(res);
            showSnackbar(`Selamat datang, ${res.fullName}`, "success");
        },
        onError: (err: any) => {
            const responseData = err.response?.data;

            if (responseData?.errors) {
                setServerErrors(responseData.errors);
                showSnackbar("Validasi gagal, periksa input Anda","error");
            }else if(responseData?.message){
                showSnackbar(responseData.message,"error");
            }else{
                showSnackbar("Terjadi kesalahan pada server","error");
            }
        },
        onMutate:()=>{
            setServerErrors({});
        }

    });
    
    return{
        form,
        setForm,
        isSubmitting:mutation.isPending,
        serverErrors,
        handleLogin:mutation.mutate
    }


}
import { toast } from "react-toastify"

export function useToastify() {

    const success = (msg: string) => {
        toast.success(msg, {
            autoClose: 2000,
            position: "bottom-right"
        })
    }

    const error = (msg: string) => {
        toast.error(msg, {
            autoClose: 2000,
            position: "bottom-right"
        })
    }

    return {
        success,
        error
    }
}
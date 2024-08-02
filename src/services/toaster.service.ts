import { toast } from 'react-toastify';

const config: any = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
}
class ToasterService {
    show(message: string) {
        toast(message, config)
    }
}

export const toasterService = new ToasterService();
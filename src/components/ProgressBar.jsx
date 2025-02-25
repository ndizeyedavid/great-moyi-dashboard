import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function ProgressBar() {
    const location = useLocation();

    NProgress.configure({ showSpinner: false })

    useEffect(() => {
        NProgress.start();
        setTimeout(() => {
            NProgress.done();
        }, 500);
    }, [location]);

    return null;
}

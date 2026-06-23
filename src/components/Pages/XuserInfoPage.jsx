import { useEffect } from "react";
import PageBanner from "../PageBanner";
import XuserInfo from "../XuserInfo";


export default function XuserInfoPage({ token }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XuserInfo token={token} />
        </div>
    )
}
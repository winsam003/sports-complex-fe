import PageBanner from "../PageBanner";
import XStaffRegister from "../XStaffRegister";
import { useEffect } from 'react';

export default function XStaffRegisterPage({ token }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XStaffRegister token={token} />
        </div>
    )
}
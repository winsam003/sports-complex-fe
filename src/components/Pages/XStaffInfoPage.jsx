import PageBanner from "../PageBanner";
import XStaffInfo from "../XStaffInfo";
import { useEffect } from 'react';

export default function XStaffInfoPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XStaffInfo />
        </div>
    )
}
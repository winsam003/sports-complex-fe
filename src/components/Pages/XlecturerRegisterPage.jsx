import PageBanner from "../PageBanner";
import XlecturerRegister from "../XlecturerRegister";
import { useEffect } from 'react';

export default function XlecturerRegisterPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XlecturerRegister />
        </div>
    )
}
import PageBanner from "../PageBanner";
import XSugangRequest from "../XSugangRequest";
import { useEffect } from 'react';

export default function XSugangRequestPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XSugangRequest />
        </div>
    )
}
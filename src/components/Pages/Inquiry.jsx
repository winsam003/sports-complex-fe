import PageBanner from '../PageBanner';
import InquiryRegistration from '../InquiryRegistration';
import { useEffect } from 'react';

export default function Inquiry() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <InquiryRegistration />
        </div>
    )
}
import PageBanner from '../PageBanner';
import InfoHandlingPolicy from '../InfoHandlingPolicy';
import { useEffect } from 'react';

// 개인정보처리방침
export default function InfoHandlingPolicyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <InfoHandlingPolicy />
        </div>
    )
}
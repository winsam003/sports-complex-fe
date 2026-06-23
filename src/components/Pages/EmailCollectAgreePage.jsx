import PageBanner from '../PageBanner';
import EmailCollectAgree from '../EmailCollectAgree';
import { useEffect } from 'react';

// 이메일수집거부
export default function EmailCollectAgreePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <EmailCollectAgree />
        </div>
    )
}
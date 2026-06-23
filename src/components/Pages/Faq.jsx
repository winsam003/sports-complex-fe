import PageBanner from '../PageBanner';
import FaqBoard from '../FaqBoard'
import { useEffect } from 'react';

// 자주하는 질문
export default function Faq() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <FaqBoard />
        </div>
    )
}
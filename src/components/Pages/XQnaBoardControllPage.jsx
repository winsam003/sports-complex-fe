import PageBanner from '../PageBanner';
import XQnaControllContent from '../XQnaControllContent';
import { useEffect } from 'react';

// 문의게시판 관리
export default function XQnaBoardControllPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XQnaControllContent />
        </div>
    )
}
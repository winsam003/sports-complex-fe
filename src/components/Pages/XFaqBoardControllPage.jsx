import { useEffect } from 'react';
import PageBanner from '../PageBanner';
import XFaqControllContent from '../XFaqControllContent';

// 자주하는질문 게시판 관리
export default function XFaqBoardControllPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XFaqControllContent />
        </div>
    )
}
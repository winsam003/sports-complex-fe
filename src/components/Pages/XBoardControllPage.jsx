import { useEffect } from 'react';
import PageBanner from '../PageBanner';
import XBoardControllContent from '../XBoardControllContent';

// 공지사항 관리
export default function XBoardControllPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XBoardControllContent />
        </div>
    )
}
import { useEffect } from 'react';
import PageBanner from '../PageBanner';
import XBoardControllContentDateil from '../XBoardControllContentDateil';

// 공지사항 관리
export default function XBoardControllPageDetailPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XBoardControllContentDateil />
        </div>
    )
}
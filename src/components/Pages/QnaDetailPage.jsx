import PageBanner from '../PageBanner';
import QnaDetail from '../QnaDetail';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// 문의게시판 상세 페이지
export default function QnaDetailPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <QnaDetail />
        </div>
    )
}
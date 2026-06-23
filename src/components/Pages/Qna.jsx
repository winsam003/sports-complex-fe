import PageBanner from '../PageBanner';
import QnaBoard from '../QnaBoard'
import { useEffect } from 'react';

// 문의게시판
export default function Qna() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <QnaBoard />
        </div>
    )
}
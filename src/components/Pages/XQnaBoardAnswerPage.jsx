import PageBanner from '../PageBanner';
import XQnaBoardAnswerContent from '../XQnaBoardAnswerContent';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// 문의게시판 답글등록 페이지
export default function XQnaBoardAnswerPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const location = useLocation();
    const { qnaData } = location.state;

    return (
        <div>
            <PageBanner />
            <XQnaBoardAnswerContent qnaData={qnaData} />
        </div>
    )
}
import PageBanner from '../PageBanner';
import SugangContent from '../SugangContent';
import Xclass from '../Xclass';
import { useEffect } from 'react';

// 수강 신청
export default function Sugang() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <Xclass />
        </div>
    )
}
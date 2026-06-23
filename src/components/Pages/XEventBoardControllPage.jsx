import { useEffect } from 'react';
import PageBanner from '../PageBanner';
import XEventControllContent from '../XEventControllContent';

// 이벤트 게시글 관리
export default function XEventBoardControllPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        
        <div>
            <PageBanner />
            <XEventControllContent />
        </div> 
    )
}
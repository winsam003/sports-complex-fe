import PageBanner from '../PageBanner';
import VideoHandle from '../VideoHandle';
import { useEffect } from 'react';

// 영상정보처리기운영방침
export default function VideoHandlePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <VideoHandle />
        </div>
    )
}
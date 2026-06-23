import { useEffect } from 'react';
import PageBanner from '../PageBanner';
import VisitWayContent from '../VisitWayContent';

// 찾아오시는길
export default function VisitWayPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <PageBanner />
            <VisitWayContent />
        </div>
    )
}
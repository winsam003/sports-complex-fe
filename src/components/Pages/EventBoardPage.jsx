import PageBanner from '../PageBanner';
import EventBoard from '../EventBoard';
import { useEffect } from 'react';

export default function EventBoardPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <PageBanner />
            <EventBoard />
        </div>
    )

}
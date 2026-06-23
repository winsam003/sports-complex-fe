import { useEffect } from 'react';
import FindID from '../FindID';
import PageBanner from '../PageBanner';

export default function FindIDPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <FindID />
        </div>
    )
}
import ApplicationDetails from '../ApplicationDetails';
import PageBanner from '../PageBanner';
import { useEffect } from 'react';

export default function ApplicationDetailsPage({ token, getUserID }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <PageBanner />
            <ApplicationDetails token={token} getUserID={getUserID} />
        </div>
    )

}
import PageBanner from '../PageBanner';
import EmailCollectRefusal_Content from '../EmailCollectRefusal_Content';
import { useEffect } from 'react';

export default function EmailCollectRefusal() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <EmailCollectRefusal_Content />
        </div>
    )
}

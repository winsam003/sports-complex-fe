import PageBanner from '../PageBanner';
import Xclass from '../Xclass';
import { useEffect } from 'react';

export default function XClassesInfoControl() {
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
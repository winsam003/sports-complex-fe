import { useEffect } from 'react';
import PageBanner from '../PageBanner';
import XRentalPlaceControll from '../XRentalPlaceControll';

// 대관 시설 관리
export default function XRentalPlaceControllPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XRentalPlaceControll />
        </div>
    )
}
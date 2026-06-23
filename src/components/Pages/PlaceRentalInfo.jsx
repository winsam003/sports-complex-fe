import { useEffect } from 'react';
import PageBanner from '../PageBanner';
import PlaceRentalInfoContent from '../PlaceRentalInfoContent';

// 대관 신청 안내페이지
export default function PlaceRental({ roleList }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <PlaceRentalInfoContent roleList={roleList}/>
        </div>
    )
}
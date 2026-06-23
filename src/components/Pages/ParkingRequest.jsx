import PageBanner from '../PageBanner';
import ParkingRequestContent from '../ParkingRequestContent';

// 주차 신청
export default function ParkingRequest({getUserName, getUserID}) {
    return (
        <div>
            <PageBanner />
            <ParkingRequestContent getUserID={getUserID} getUserName={getUserName} />
        </div>
    )
}
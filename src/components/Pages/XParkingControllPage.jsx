import PageBanner from '../PageBanner';
import XParkingControll from '../XParkingControll';

// 문의게시판 답글등록
export default function XParkingControllPage({token}) {
    return (
        <div>
            <PageBanner />
            <XParkingControll token={token} />
        </div>
    )
}
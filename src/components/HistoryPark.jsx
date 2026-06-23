import { apiCall } from '../apiService/apiService';
import './HistoryPark.css'
import HistoryParkContent from './HistoryParkContent';

export default function HistoryPark({myParkapp, cancelParkapp, token}) {

   


    return (
        <div>

            <div className="HistoryPark_box">
                <div className="HistoryPark_index">
                    {/* <span>주차신청번호</span> */}
                    <span>신청일자</span>
                    <span>이용 달</span>
                    <span>차량 번호</span>
                    <span>주차장</span>
                    <span>결제방법</span>
                    <span>상태</span>
                    <span>취소</span>
                </div>
                <HistoryParkContent myParkapp={myParkapp} cancelParkapp={cancelParkapp} />
            </div>
        </div>
    )
}
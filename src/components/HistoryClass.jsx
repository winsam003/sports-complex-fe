import './HistoryClass.css'
import HistoryClassContent from './HistoryClassContent';

export default function HistoryClass({ myClassAppHistory, handlePayment, handleCancel }) {
    return (
        <div>
            <div className="HistoryClass_Index">
                <p>신청번호</p>
                <p>신청일자</p>
                <p>강좌번호</p>
                <p>강좌명</p>
                <p>기간</p>
                <p>금액</p>
                <p>신청상태</p>
                <p>결제방법</p>
                <p>결제/취소</p>
            </div>
            <div className="HistoryClass_content">
                {myClassAppHistory.map((item, index) => (
                    <HistoryClassContent key={index} {...item} handlePayment={handlePayment} handleCancel={handleCancel} />
                ))}
            </div>
        </div>
    )
}
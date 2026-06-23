import './ClassScheduleDetail.css';

export default function ClassScheduleDetail(){
    return(
        <div className='ClassScheduleDetail_div'>
            <div className='ClassScheduleDetail_index'>
                <span>구분</span>
                <span>강좌명</span>
                <span>강좌신청시작</span>
                <span>강좌신청마감</span>
                <span>대상</span>
                <span>정원</span>
                <span>신청현황</span>
                <span>대기</span>
                <span>금액</span>
                <span>신청</span>
            </div>
            <div className="ClassScheduleDetail_Box">
                <span>수영</span>
                <span>접영</span>
                <span>2024.03.19</span>
                <span>2024.03.31</span>
                <span>성인</span>
                <span>50</span>
                <span>12/50</span>
                <span>0</span>
                <span>80,000</span>
                <button>신청</button>
            </div>
        </div>
    )
}
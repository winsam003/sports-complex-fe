import './XclassListDetail.css';
import XclassListDetailList from './XclassListDetailList';

export default function XclassListDetail(){

    // 테스트용 객체입니다 테이블 연결 후 테이블 데이터로 교체할 예정입니다.
    const data = [
        {

            "classNum": "1",
            "className": "이정혁 선수와 배우는 수영교실",
            "classAppDate": "03.02~04.01",
            "classDate": "04.01~04.30",
            "currentApp": "32",
            "waitingQueue": "0",
            "total": "50",
            "cost": "72000",
            "nowState": "접수중",
        },
        {

            "classNum": "2",
            "className": "임시운의 밸리댄스",
            "classAppDate": "03.01~03.32",
            "classDate": "04.01~04.30",
            "currentApp": "7",
            "waitingQueue": "0",
            "total": "50",
            "cost": "102000",
            "nowState": "접수중",
        },
        {

            "classNum": "3",
            "className": "백승현 테니스 강좌",
            "classAppDate": "03.01~03.32",
            "classDate": "04.01~04.30",
            "currentApp": "50",
            "waitingQueue": "7",
            "total": "50",
            "cost": "85000",
            "nowState": "예약대기",
        },
        {

            "classNum": "4",
            "className": "김수미 k-pop 댄스 기초",
            "classAppDate": "02.01~02.28",
            "classDate": "03.01~03.31",
            "currentApp": "50",
            "waitingQueue": "0",
            "total": "50",
            "cost": "120000",
            "nowState": "접수종료",
        },
    ]




    return(
        <div className='XclassListDetail_Box'>
            <div className='XclassListDetail_Container'>
                <div className='XclassListDetail_category'>
                    <span>체크</span>
                    <span>번호</span>
                    <span>강좌명</span>
                    <span>강의 날짜</span>
                    <span>현재원</span>
                    <span>대기원</span>
                    <span>정원</span>
                    <span>금액</span>
                    <span>신청 날짜</span>
                    <span>현황</span>
                </div>
                <div className='XclassListDetail_list'>
                    {data.map((it, index) => (
                        <XclassListDetailList key={index} {...it}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
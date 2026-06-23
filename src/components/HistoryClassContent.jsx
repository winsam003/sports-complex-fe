import './HistoryClassContent.css'
import { apiCall } from '../apiService/apiService';

export default function HistoryClassContent({ classappnum, classappdate, classappstate, classes, payment, handlePayment, handleCancel }) {
    // date를 연월일시분 형식으로 표현
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const hours = String(formattedDate.getHours()).padStart(2, '0');
        const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const appdate = formatDate(classappdate);
    const clstart = formatDate(classes.clstart);
    const clend = formatDate(classes.clend);

    // 가격 설정
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(classes.clprice);

    return (
        <div className='HistoryClassContent_div'>
            <p>{classappnum}</p>
            <p>{appdate}</p>
            <p>{classes.clnum}</p>
            <p>{classes.clname}</p>
            <p>{clstart}<br />- {clend}</p>
            <p>{formattedPrice}</p>
            <p>{classappstate}</p>
            <p>{payment}</p>
            {classappstate === '신청 완료' ?
                <div className='HistoryClassContent'>
                    <button onClick={() => handlePayment(classappnum)}>결제</button>
                    <button onClick={() => handleCancel(classappnum)}>취소</button>
                </div>
                :
                (classappstate === '신청 완료' || classappstate === '대기' || classappstate === '결제 완료') ?
                    <div className='HistoryClassContent'>
                        <button onClick={() => handleCancel(classappnum)}>취소</button>
                    </div>
                    : null}
        </div>
    )
}
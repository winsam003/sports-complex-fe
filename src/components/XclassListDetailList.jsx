import './XclassListDetailList.css';

export default function XclassListDetailList({ classNum, className, classAppDate, classDate, currentApp, waitingQueue, total, cost, nowState }){

    return(
        <div className='XclassListDetailList_Box'>
            <div className='XclassListDetailList_list'>
                <span><input disabled={nowState === '접수종료'} type='checkbox' id='XclassListDetail_check' name='XclassListDetail_check' /></span>
                <span>{classNum}</span>
                <span>{className}</span>
                <span>{classDate}</span>
                <span>{currentApp}</span>
                <span>{waitingQueue}</span>
                <span>{total}</span>
                <span>{cost} 원</span>
                <span>{classAppDate}</span>
                <span>{nowState}</span>
            </div>
        </div>
    )
}
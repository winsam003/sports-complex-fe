import './ClassScheduleList.css';
import ClassScheduleDetail from './ClassScheduleDetail';

import { TbCalendar } from "react-icons/tb";

export default function ClassSchedule() {
    return (
        <div className="ClassSchedule_Containor">
            {/* <p className='ClassSchedule_title'> 월 별 선택</p> */}
            <div className='ClassSchedule_Search'>
                <div className='ClassSchedule_CalendarCaption'>월간일정 <TbCalendar className='ClassSchedule_Icon' /></div>
                <div className='ClassSchedule_Calendar'>
                    <div>1월</div>
                    <div>2월</div>
                    <div>3월</div>
                    <div>4월</div>
                    <div>5월</div>
                    <div>6월</div>
                    <div>7월</div>
                    <div>8월</div>
                    <div>9월</div>
                    <div>10월</div>
                    <div>11월</div>
                    <div>12월</div>
                </div>
            </div>
            <div className='ClassSchedule_CheckBox'>
                <span>
                    <label htmlFor='withBall'>구기종목</label>
                    <input type="checkbox" id='withBall' name='classType' value={'withBall'} />
                </span>
                <span>
                    <label htmlFor='water'>수상종목</label>
                    <input type="checkbox" id='water' name='classType' value={'water'} />
                </span>
                <span>
                    <label htmlFor='dance'>댄스</label>
                    <input type="checkbox" id='dance' name='classType' value={'dance'} />
                </span>
                <span>
                    <label htmlFor='racket'>라켓종목</label>
                    <input type="checkbox" id='racket' name='classType' value={'racket'} />
                </span>
                <span>
                    <label htmlFor='weight'>웨이트</label>
                    <input type="checkbox" id='weight' name='classType' value={'weight'} />
                </span>
            </div>
            <div className='ClassSchedule_List'>

                <ClassScheduleDetail />
                
            </div>
        </div>
    )
}
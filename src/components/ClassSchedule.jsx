import Submenu from './Submenu';
import ClassScheduleDetail from './ClassScheduleList';
import './ClassSchedule.css';


export default function ClassSchedule(){
    return(
        <div className='ClassSchedule_Box'>
            <Submenu />
            <ClassScheduleDetail />
        </div>
    )
}
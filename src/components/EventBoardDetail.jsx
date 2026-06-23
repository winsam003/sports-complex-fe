import Submenu from "./Submenu";
import EventDetail from "./EventDetail";
import './EventBoardDetail.css';

export default function EventBoardDetail({eventcode}){
    return(
        <div className="EventBoardDetail">
            <Submenu />
            <EventDetail eventcode={eventcode}  />
        </div>
    )
}
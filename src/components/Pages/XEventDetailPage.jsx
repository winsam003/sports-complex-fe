import PageBanner from '../PageBanner';
import EventBoardDetail from '../EventBoardDetail';
import { useLocation } from 'react-router';
import XEventBoardDetail from '../XEventBoardDetail';

export default function XEventDetailPage({token}){

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventcode = searchParams.get('eventcode');

    return(
        <div>
            <PageBanner />
            <XEventBoardDetail eventcode={eventcode} token={token}/>
        </div>
    )
}
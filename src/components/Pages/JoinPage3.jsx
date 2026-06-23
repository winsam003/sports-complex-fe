import PageBanner from '../PageBanner';
import FindPassword from '../FindPassword';
import RegistrationFlow from './../RegistrationFlow';
import { useLocation } from 'react-router';

export default function JoinPage3() {
    
    const location = useLocation();
    const { memberType } = location.state;

    return (
        <div>
            <PageBanner />
            <RegistrationFlow />
            <FindPassword memberType={memberType} />

        </div>
    )
}
import PageBanner from '../PageBanner';
import JoinMember from '../JoinMember';
import RegistrationFlow from '../RegistrationFlow';
import { useLocation } from 'react-router';

export default function JoinPage4() {
    const location = useLocation();

    const { memberType } = location.state || {};

    return (
        <div>
            <PageBanner />
            <RegistrationFlow />
            <JoinMember memberType={memberType} />
        </div>
    )
}
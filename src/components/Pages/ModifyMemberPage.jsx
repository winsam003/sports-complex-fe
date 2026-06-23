import PageBanner from '../PageBanner';
import ModifyMemberAndSubMenu from '../ModifyMemberAndSubMenu';
import { useEffect } from 'react';

export default function ModifyMemberPage({ getUserID, roleList, token }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <ModifyMemberAndSubMenu getUserID={getUserID} roleList={roleList} token={token} />
        </div>
    )
}
import PasswordChange from '../PasswordChange';
import PageBanner from './../PageBanner';


export default function PasswordChangePage({ getUserID }){
    return(
        <div>
            <PageBanner />
            <PasswordChange getUserID={getUserID} />
        </div>
    )
}
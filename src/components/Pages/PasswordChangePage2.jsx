import PasswordChange2 from '../PasswordChange2';
import PageBanner from './../PageBanner';


export default function PasswordChangePage2({ token }) {
    return (
        <div>
            <PageBanner />
            <PasswordChange2 token={token} />
        </div>
    )
}
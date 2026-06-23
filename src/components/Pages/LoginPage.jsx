import Login from '../Login';
import PageBanner from '../PageBanner';

export default function LoginPage({ setLogincheck, loginCheck }) {
    return (
        <div>
            <PageBanner />
            <Login setLogincheck={setLogincheck} loginCheck={loginCheck} />
        </div>
    )
}
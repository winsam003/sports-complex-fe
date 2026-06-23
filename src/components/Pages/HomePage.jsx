import PageBanner from '../PageBanner';
import HomeDetail from '../HomeDetail';
import MiddleMenu from '../MiddleMenu';
import { useEffect } from 'react';

export default function HomePage({ setLogincheck, loginCheck, logout, getUserName, roleList }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <HomeDetail setLogincheck={setLogincheck} loginCheck={loginCheck} logout={logout} getUserName={getUserName} roleList={roleList} />
            <MiddleMenu />
        </div>
    )
}
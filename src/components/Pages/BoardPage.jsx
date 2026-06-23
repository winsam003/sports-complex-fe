import { useEffect } from 'react';
import Board from '../Board';
import PageBanner from '../PageBanner';

// 공지사항
export default function Boardpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <Board />
        </div>
    )

}
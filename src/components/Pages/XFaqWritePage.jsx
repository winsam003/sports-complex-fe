import PageBanner from '../PageBanner';
import XBoardWriteContent from '../XBoardWriteContent';

// 공지사항 등록
export default function XBoardWritePage({ getUserID, token }) {
    return (
        <div>
            <PageBanner />
            <XBoardWriteContent getUserID={getUserID} token={token} />
        </div>
    )
}
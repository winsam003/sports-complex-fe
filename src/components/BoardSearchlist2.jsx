
import { useNavigate } from 'react-router';
import './BoardSearchList2.css'

export default function BoardSearchList2({ quest, notnum, nottitle, stfid, notdate, notcount, notuploadfile, notdetail }) {

    // qadate를 연월일시분 형식으로 표현
    const formattedDate = new Date(notdate).toLocaleString('ko-KR', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 오전/오후 표기를 제거하기 위해
    }).replace(/\./g, '');



    const navigate = useNavigate();
    const boardDetail = () => {
        if (window.location.pathname === '/Faq') {
            navigate(`/FaqControllPageDetailPage?notnum=${notnum}`, {
                state: {
                    notnum: notnum,
                    nottitle: nottitle,
                    quest: quest,
                    stfid: stfid,
                    notdate: notdate,
                    notuploadfile: notuploadfile,
                    notcount: notcount,
                    notdetail: notdetail
                }
            });
        } else {
            navigate(`/BoardControllPageDetailPage?notnum=${notnum}`, {
                state: {
                    notnum: notnum,
                    nottitle: nottitle,
                    quest: quest,
                    stfid: stfid,
                    notdate: notdate,
                    notuploadfile: notuploadfile,
                    notcount: notcount,
                    notdetail: notdetail
                }
            });
        }
    }


    return (
        <div className='BoardSearchList_content2Box'>
            <div className='BoardSearchList_content2'>
                <span>{notnum}</span>
                <span onClick={boardDetail}>{nottitle}</span>
                <span>{quest}</span>
                <span>{formattedDate}</span>
                <span>{stfid}</span>
                <span>{notcount}</span>
            </div>
        </div>
    )
}
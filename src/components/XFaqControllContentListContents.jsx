import { useNavigate } from 'react-router';
import './XFaqControllContentListContents.css'


export default function XFaqControllContentListContents({ notnum, nottitle, quest, notdate, notuploadfile, notcount, notdetail, stfid, userDelete, isChecked }) {

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

    const handleDelete = (e) => {
        userDelete(notnum, e.target.checked);
    }

    // detail로 정보를 가지고 이동
    const navigate = useNavigate();
    const boardDetail = () => {
        navigate(`/XFnqControllPageDetailPage?notnum=${notnum}`, {
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

    return (
        <div className='XFaqControllContentListContents_div'>
            <div className='XFaqControllContentListContents_contents'>
                <p><input checked={isChecked} type='checkbox' onChange={handleDelete} /></p>
                <p>{notnum}</p>
                <p onClick={boardDetail}>{nottitle}</p>
                <p>{quest}</p>
                <p>{formattedDate}</p>
                <p>{stfid}</p>
                <p>{notcount}</p>
            </div>
        </div>
    )
}

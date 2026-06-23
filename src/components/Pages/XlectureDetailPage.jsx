import PageBanner from "../PageBanner";
import Submenu from "../Submenu";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function XlectureDetailPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // 사용자 페이지 접근
    const location = useLocation();
    const { teachData } = location.state;
    const { teachname, teachbirth, teachphone, teachlicense, teachaccount, teachrdate, teachcode, teachnum } = teachData;

    // 강사 목록으로 이동
    const navigate = useNavigate();

    const goToLecturePage = () => {
        navigate('/XlecturePage');
    }

    // 강사 생일 출력 양식
    const formatbirth = (teachbirth) => {
        const date = new Date(teachbirth);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };
    const formatrDate = (teachrdate) => {
        const date = new Date(teachrdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const lectureInfoUpdate = () => {
        navigate('/XlectureModifyPage', { state: { teachData } });
    }

    return (
        <div>
            <PageBanner />
            <div className="XlectureInfo_Box">
                <Submenu />
                <div className='XlectureRegisterDetail_Box'>
                    <div className='XlectureRegisterDetail_Container'>
                        <table>
                            <caption className='XlectureRegisterDetail_Caption'>강사정보</caption>
                            <tbody>
                                <tr>
                                    <th className='JoinLecture_title'>이름</th>
                                    <td>{teachname}</td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>생년월일</th>
                                    <td>{formatbirth(teachbirth)}</td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>연락처</th>
                                    <td>{teachphone}</td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>강사 코드</th>
                                    <td>{teachcode}</td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>보유 자격증</th>
                                    <td>{teachlicense}</td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>계좌번호</th>
                                    <td>{teachaccount}</td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>등록일</th>
                                    <td>{formatrDate(teachrdate)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='XResetDeleteBtn' >
                            <button className="JoinLecture_submitButton" onClick={goToLecturePage}>목록</button>
                            <button className="JoinLecture_submitButton" onClick={lectureInfoUpdate}>변경</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
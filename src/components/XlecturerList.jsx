import './XlecturerList.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

export default function XlectureList({ teachnum, teachcode, teachname, teachbirth, teachphone, teachadress, teachadress1, teachadress2, teachlicense, teachaccount, onToggleCheckbox, isChecked }) {
    // 상세페이지로 이동하기
    const navigate = useNavigate();

    //    체크박스 상태
    const handleCheckboxChange = (e) => {
        onToggleCheckbox(teachnum);
    }

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 강사 생일 출력 양식
    const formatDate = (teachbirth) => {
        const date = new Date(teachbirth);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    // detail 페이지 데이터 요청
    const fetchTeachData = async (teachnum) => {
        try {
            let url = '/teach/teachDetail';
            
            const response = await
                apiCall(url + `/${teachnum}`, 'get', null, userData.token)
            return response;
        } catch (error) {
            console.error('Error fetching teach data:', error);
            throw error;
        }
    };

    const handleTeachResultClick = async () => {
        try {
            const teachData = await fetchTeachData(teachnum);
            navigate('/XlectureDetailPage', { state: { teachData } });
        } catch (error) {
            console.log('Error fetching Teach data : ', error);
        }
    };

    return (
        <div>
            <div className='XlectureInfoList_content'
                onClick={(e) => {
                    // 페이지 이동 이벤트에서 체크박스 제외
                    if (e.target.tagName.toLowerCase() !== 'input' && e.target.tagName.toLowerCase() === 'span') {
                        if (!e.target.querySelector('input')) {
                            handleTeachResultClick();
                        }
                    }
                }}>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span>{teachnum}</span>
                <span>{teachcode}</span>
                <span>{teachname}</span>
                <span>{formatDate(teachbirth)}</span>
                <span>{teachphone}</span>
                <span>{teachlicense}</span>
                <span>{teachaccount}</span>
            </div>
        </div >
    )
}
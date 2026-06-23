import PageBanner from "../PageBanner";
import Submenu from "../Submenu";
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCall } from '../../apiService/apiService';

export default function XlectureModifyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // 사용자 페이지 접근
    const location = useLocation();
    const { teachData } = location.state;
    const { teachnum, teachcode, teachname, teachbirth, teachphone, teachlicense, teachaccount } = teachData;

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 대분류, 세부종목 초기값을 위함
    const initialBT = teachcode.substring(2, 4);
    const initialST = teachcode.substring(4, 6);

    const [updateTeachData, setUpdateTeachData] = useState({
        teachnum: teachnum,
        BT: initialBT,
        ST: initialST,
        teachcode: teachcode,
        teachname: teachname,
        teachbirth: teachbirth,
        teachphone: teachphone,
        teachlicense: teachlicense,
        teachaccount: teachaccount
    });

    const handleCodeChange = (e) => {
        const { name, value } = e.target;
        if (name === 'BT') {
            let code = 'TE';
            if (value === 'BA') {
                code += 'BA';
            } else if (value === 'WA') {
                code += 'WA';
            } else if (value === 'DC') {
                code += 'DC';
            } else if (value === 'LA') {
                code += 'LA';
            } else if (value === 'WE') {
                code += 'WE';
            }
            // 대분류를 변경할 때 세부종목 코드를 자동으로 설정
            const firstST = getFirstSubCategoryCode(value);
            code += firstST;
            setUpdateTeachData({ ...updateTeachData, [name]: value, ST: firstST, teachcode: code });
        } else if (name === 'ST') {
            let code = updateTeachData.teachcode.substring(0, 4);
            if (value === 'BK') {
                code += 'BK';
            } else if (value === 'BS') {
                code += 'BS';
            } else if (value === 'FT') {
                code += 'FT';
            } else if (value === 'SW') {
                code += 'SW';
            } else if (value === 'DI') {
                code += 'DI';
            } else if (value === 'KP') {
                code += 'KP';
            } else if (value === 'BD') {
                code += 'BD';
            } else if (value === 'PP') {
                code += 'PP';
            } else if (value === 'BM') {
                code += 'BM';
            } else if (value === 'TE') {
                code += 'TE';
            } else if (value === 'SQ') {
                code += 'SQ';
            } else if (value === 'CL') {
                code += 'CL';
            } else if (value === 'CR') {
                code += 'CR';
            } else if (value === 'PI') {
                code += 'PI';
            }
            setUpdateTeachData({ ...updateTeachData, [name]: value, teachcode: code });
        }
    };

    const getFirstSubCategoryCode = (category) => {
        switch (category) {
            case 'BA':
                return 'BK'; // 농구
            case 'WA':
                return 'SW'; // 수영
            case 'DC':
                return 'KP'; // K-POP
            case 'LA':
                return 'PP'; // 탁구
            case 'WE':
                return 'CL'; // 클라이밍
            default:
                return ''; // 기본값은 빈 문자열
        }
    };

    // 나머지 항목 변경 시 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateTeachData({ ...updateTeachData, [name]: value });
    };

    // 강사 목록으로 이동
    const navigate = useNavigate();

    const goToLecturePage = () => {
        navigate('/XlecturePage');
    }

    // 강사 생일 출력 양식
    const formatDate = (teachbirth) => {
        const date = new Date(teachbirth);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    // 강사 정보 변경
    const UpdateLecture = async () => {
        let url = '/teach/teachUpdate';
        console.log(updateTeachData);
        apiCall(url, 'post', updateTeachData, userData.token)
            .then((response) => {
                navigate('/XlectureDetailPage', { state: { teachData: { ...teachData, name: updateTeachData.teachname, birth: updateTeachData.teachbirth, phone: updateTeachData.teachphone, license: updateTeachData.teachlicense, account: updateTeachData.teachaccount, rdate: updateTeachData.teachrdate } } });
            }).catch((error) => {
                console.error("teach info update error : ", error);
            })
    };

    return (
        <div>
            <PageBanner />
            <div className="XlectureInfo_Box">
                <Submenu />
                <div className='XlectureRegisterDetail_Box'>
                    <div className='XlectureRegisterDetail_Container'>
                        <table>
                            <caption className='XlectureRegisterDetail_Caption'>강사정보변경</caption>
                            <tbody>
                                <tr>
                                    <th className='JoinLecture_title'>대분류</th>
                                    <td>
                                        <select value={updateTeachData.BT} onChange={handleCodeChange} className='newClassesSelect' name='BT'>
                                            <option value="BA">구기</option>
                                            <option value="WA">수상</option>
                                            <option value="DC">댄스</option>
                                            <option value="LA">라켓</option>
                                            <option value="WE">웨이트</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>세부종목</th>
                                    <td>
                                        {updateTeachData.BT === 'BA' && (
                                            <select value={updateTeachData.ST} onChange={handleCodeChange} className='newClassesSelect' name='ST'>
                                                <option value="BK">농구</option>
                                                <option value="BS">야구</option>
                                                <option value="FT">풋살</option>
                                            </select>
                                        )}
                                        {updateTeachData.BT === 'WA' && (
                                            <select value={updateTeachData.ST} onChange={handleCodeChange} className='newClassesSelect' name='ST'>
                                                <option value="SW">수영</option>
                                                <option value="DI">다이빙</option>
                                            </select>
                                        )}
                                        {updateTeachData.BT === 'DC' && (
                                            <select value={updateTeachData.ST} onChange={handleCodeChange} className='newClassesSelect' name='ST'>
                                                <option value="KP">K-POP</option>
                                                <option value="BD">벨리댄스</option>
                                            </select>
                                        )}
                                        {updateTeachData.BT === 'LA' && (
                                            <select value={updateTeachData.ST} onChange={handleCodeChange} className='newClassesSelect' name='ST'>
                                                <option value="PP">탁구</option>
                                                <option value="BM">배드민턴</option>
                                                <option value="TE">테니스</option>
                                                <option value="SQ">스쿼시</option>
                                            </select>
                                        )}
                                        {updateTeachData.BT === 'WE' && (
                                            <select value={updateTeachData.ST} onChange={handleCodeChange} className='newClassesSelect' name='ST'>
                                                <option value="CL">클라이밍</option>
                                                <option value="CR">크로스핏</option>
                                                <option value="PI">필라테스</option>
                                            </select>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>강사코드</th>
                                    <td><input name="teachcode" value={updateTeachData.teachcode} /></td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>이름</th>
                                    <td><input name="teachname" defaultValue={updateTeachData.teachname} readOnly /></td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>생년월일</th>
                                    <td><input name="teachbirth" defaultValue={formatDate(updateTeachData.teachbirth)} readOnly /></td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>연락처</th>
                                    <td><input name="teachphone" value={updateTeachData.teachphone} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>보유 자격증</th>
                                    <td><input name="teachlicense" value={updateTeachData.teachlicense} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <th className='JoinLecture_title'>계좌번호</th>
                                    <td><input name="teachaccount" value={updateTeachData.teachaccount} onChange={handleInputChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='XResetDeleteBtn' >
                            <button className="JoinLecture_submitButton" onClick={goToLecturePage}>목록</button>
                            <button className="JoinLecture_submitButton" onClick={UpdateLecture}>변경</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
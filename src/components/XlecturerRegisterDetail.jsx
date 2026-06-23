import './XlecturerRegisterDetail.css';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

export default function XlecturerRegisterDetail() {
    const [insertTeachData, setInsertTeachData] = useState({
        BT: 'BA',
        ST: 'BK',
        teachcode: 'TEBABK',
        bank: '농협은행',
        teachaccount: ''
    });

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 강사 등록 후 강사 디테일로 이동
    const navigate = useNavigate();

    // 강사코드조합
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
            setInsertTeachData({ ...insertTeachData, [name]: value, ST: firstST, teachcode: code });
        } else if (name === 'ST') {
            let code = insertTeachData.teachcode.substring(0, 4);
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
            setInsertTeachData({ ...insertTeachData, [name]: value, teachcode: code });
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
        // 은행, 계좌번호
        if (name == 'teachaccount') {
            const bankAndAccount = insertTeachData.bank + ' ' + value;
            setInsertTeachData({ ...insertTeachData, [name]: bankAndAccount });
        } else {
            setInsertTeachData({ ...insertTeachData, [name]: value });
        }
    };

    const InsertLecture = async () => {
        let url = '/teach/teachInsert';

        const currentTime = new Date().toISOString();

        // teachrdate 추가
        const insertTeachDataFinal = { ...insertTeachData, teachrdate: currentTime };

        apiCall(url, 'post', insertTeachDataFinal, userData.token)
            .then((response) => {
                navigate('/XlectureDetailPage', { state: { teachData: { ...insertTeachDataFinal } } });
            }).catch((error) => {
                console.log("teach info Insert Error : ", error);
            })
    }

    return (
        <div className='XlectureRegisterDetail_Box'>
            <div className='XlectureRegisterDetail_Container'>
                <table>
                    <caption className='XlectureRegisterDetail_Caption'>강사등록</caption>
                    <tbody>
                        <tr>
                            <th className='JoinLecture_title'>대분류</th>
                            <td>
                                <select className="XlectureRegisterDetail_select"
                                    value={insertTeachData.BT} onChange={handleCodeChange} name='BT'>
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
                                {insertTeachData.BT === 'BA' && (
                                    <select value={insertTeachData.ST} onChange={handleCodeChange} className="XlectureRegisterDetail_select" name='ST'>
                                        <option value="BK">농구</option>
                                        <option value="BS">야구</option>
                                        <option value="FT">풋살</option>
                                    </select>
                                )}
                                {insertTeachData.BT === 'WA' && (
                                    <select value={insertTeachData.ST} onChange={handleCodeChange} className="XlectureRegisterDetail_select" name='ST'>
                                        <option value="SW">수영</option>
                                        <option value="DI">다이빙</option>
                                    </select>
                                )}
                                {insertTeachData.BT === 'DC' && (
                                    <select value={insertTeachData.ST} onChange={handleCodeChange} className="XlectureRegisterDetail_select" name='ST'>
                                        <option value="KP">K-POP</option>
                                        <option value="BD">벨리댄스</option>
                                    </select>
                                )}
                                {insertTeachData.BT === 'LA' && (
                                    <select value={insertTeachData.ST} onChange={handleCodeChange} className="XlectureRegisterDetail_select" name='ST'>
                                        <option value="PP">탁구</option>
                                        <option value="BM">배드민턴</option>
                                        <option value="TE">테니스</option>
                                        <option value="SQ">스쿼시</option>
                                    </select>
                                )}
                                {insertTeachData.BT === 'WE' && (
                                    <select value={insertTeachData.ST} onChange={handleCodeChange} className="XlectureRegisterDetail_select" name='ST'>
                                        <option value="CL">클라이밍</option>
                                        <option value="CR">크로스핏</option>
                                        <option value="PI">필라테스</option>
                                    </select>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinLecture_title'>강사코드</th>
                            <td><input className="XlectureRegisterDetail_input"
                                name="teachcode" value={insertTeachData.teachcode} onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <th className='JoinLecture_title'>이름 <span className='JoinLecture_star'>*</span></th>
                            <td><input className="XlectureRegisterDetail_input" type="text"
                                name='teachname' id='teachname' onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <th className='JoinLecture_title'>생년월일<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <input className="XlectureRegisterDetail_input" type="date"
                                    name='teachbirth' id='teachbirth' onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinLecture_title'>휴대전화<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <input className="XlectureRegisterDetail_input" type="text"
                                    name='teachphone' id='teachphone' onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinLecture_title'>보유 자격증</th>
                            <td>
                                <input className="XlectureRegisterDetail_input" type="text"
                                    name='teachlicense' id='teachlicense' onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinLecture_title'>계좌번호</th>
                            <td className='account'>
                                <select className="XlectureRegisterDetail_select_account"
                                    name="bank" id="bank" onChange={handleInputChange}>
                                    <option value="농협은행">농협은행</option>
                                    <option value="신한은행">신한은행</option>
                                    <option value="기업은행">기업은행</option>
                                    <option value="하나은행">하나은행</option>
                                    <option value="우리은행">우리은행</option>
                                    <option value="국민은행">국민은행</option>
                                </select>
                                <input className="XlectureRegisterDetail_input" type="text"
                                    name='teachaccount' id='teachaccount' onChange={handleInputChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='JoinLecture_submitBox' >
                    <input className="JoinLecture_submitInput" type="submit" name='submit' id='submit'
                        onClick={InsertLecture} value="강사 등록" />
                </div>
            </div>
        </div>
    )
}
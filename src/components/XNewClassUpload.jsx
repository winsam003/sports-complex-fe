import Submenu from './Submenu';
import './XNewClassUpload.css';
import XlectureInfo from './XlectureInfo';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

export default function XNewClassUpload() {
    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 강사 정보 상태 추가
    const [selectedTeacher, setSelectedTeacher] = useState({
        teachnum: '',
        teachname: ''
    });

    // 선택된 강사 정보를 저장하는 함수
    const handleTeacherSelect = (teachnum, teachname) => {
        setSelectedTeacher({
            teachnum: teachnum,
            teachname: teachname
        });

        // 강사 이름을 newClassesData에 업데이트
        setNewClassesData(prevState => ({
            ...prevState,
            teachname: teachname,
            teachnum: teachnum
        }));
    };

    // 등록 후 강의정보관리 페이지 이동
    const navigate = useNavigate();

    const [newClassesData, setNewClassesData] = useState({
        classcode: 'CLBABK',
        BT: '구기',
        ST: '농구',
        cldays: ['월'],
        cltime: '06:00',
        clname: '농구 월 06:00',
        clrequest: '',
        clrequestend: '',
        clstart: '',
        clend: '',
        clfor: 'KI',
        clcount: '50',
        clwaiting: '75',
        clprice: '25000'
    });

    // 요일 선택 핸들러
    const handleDaySelect = (day) => {
        // 이미 선택된 요일이면 제거, 아니면 추가
        const updatedDays = newClassesData.cldays.includes(day)
            ? newClassesData.cldays.filter((d) => d !== day)
            : [...newClassesData.cldays, day];
        setNewClassesData({
            ...newClassesData,
            cldays: updatedDays
        });
    };

    // 시간 선택
    const handleTimeSelect = (time) => {
        setNewClassesData({
            ...newClassesData,
            cltime: time
        });
    };

    useEffect(() => {
        setNewClassesData({
            ...newClassesData,
            clrequest: getDefaultRequestDate(),
            clrequestend: getDefaultRequestEndDate(),
            clstart: getDefaultStartDate(),
            clend: getDefaultEndDate()
        });
    }, [newClassesData.BT]);

    const NewClassesContent = (e) => {
        const { name, value } = e.target;

        // 코드조합 대분류
        if (name === 'BT') {
            let code = 'CL';
            if (value === '구기') {
                code += 'BA';
            } else if (value === '수상') {
                code += 'WA';
            } else if (value === '댄스') {
                code += 'DC';
            } else if (value === '라켓') {
                code += 'LA';
            } else if (value === '웨이트') {
                code += 'WE';
            }
            setNewClassesData({ ...newClassesData, [name]: value, classcode: code + newClassesData.classcode.substring(4) });
        } else if (name === 'ST') {
            // 세부종목
            let code = newClassesData.classcode.substring(0, 4);
            if (value === '농구') {
                code += 'BK';
            } else if (value === '야구') {
                code += 'BS';
            } else if (value === '풋살') {
                code += 'FT';
            } else if (value === '수영') {
                code += 'SW';
            } else if (value === '다이빙') {
                code += 'DI';
            } else if (value === 'K-POP') {
                code += 'KP';
            } else if (value === '벨리댄스') {
                code += 'BD';
            } else if (value === '탁구') {
                code += 'PP';
            } else if (value === '배드민턴') {
                code += 'BM';
            } else if (value === '테니스') {
                code += 'TE';
            } else if (value === '스쿼시') {
                code += 'SQ';
            } else if (value === '클라이밍') {
                code += 'CL';
            } else if (value === '크로스핏') {
                code += 'CR';
            } else if (value === '필라테스') {
                code += 'PI';
            }
            setNewClassesData({ ...newClassesData, [name]: value, classcode: code });
        } else {
            setNewClassesData({ ...newClassesData, [name]: value });
            updatePrice(newClassesData.clfor, newClassesData.cldays.length);
        }
    }

    // 강좌명
    const generateClassName = (category, days, time) => {
        const selectedDaysString = days.join(', ');
        return `${category} ${selectedDaysString} ${time}`;
    };

    // ST, cldays, cltime이 변경될 때마다 clname 업데이트
    useEffect(() => {
        const { ST, cldays, cltime } = newClassesData;
        const subCategory = getSubCategory(ST);
        const className = generateClassName(subCategory, cldays, cltime); // 수정된 부분
        setNewClassesData(prevState => ({ ...prevState, clname: className }));
    }, [newClassesData.ST, newClassesData.cldays, newClassesData.cltime]);

    // 세부 종목에 따라 하위 카테고리 반환
    const getSubCategory = (ST) => {
        switch (ST) {
            case '농구':
            case '야구':
            case '풋살':
            case '수영':
            case '다이빙':
            case 'K-POP':
            case '벨리댄스':
            case '탁구':
            case '배드민턴':
            case '테니스':
            case '스쿼시':
            case '클라이밍':
            case '크로스핏':
            case '필라테스':
                return ST;
            default:
                return '';
        }
    };

    // 강의 신청 시작일
    function getDefaultRequestDate() {
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        let defaultDate;

        switch (newClassesData.BT) {
            case '구기':
            case '수상':
                defaultDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 8);
                break;
            case '댄스':
            case '라켓':
                defaultDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 15);
                break;
            case '웨이트':
                defaultDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 21);
                break;
            default:
                defaultDate = nextMonth;
                break;
        }
        return formatDate(defaultDate);
    }

    // 강의 신청 마감일
    function getDefaultRequestEndDate() {
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        let defaultEndDate;

        switch (newClassesData.BT) {
            case '구기':
            case '수상':
                defaultEndDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 14);
                break;
            case '댄스':
            case '라켓':
                defaultEndDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 21);
                break;
            case '웨이트':
                defaultEndDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 28);
                break;
            default:
                defaultEndDate = nextMonth;
                break;
        }
        return formatDate(defaultEndDate);
    }

    // 강의 시작날
    function getDefaultStartDate() {
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 1);
        return formatDate(nextMonth);
    }

    // 강의 종료날
    function getDefaultEndDate() {
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 3, 0);
        return formatDate(nextMonth);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        updatePrice(newClassesData.clfor, newClassesData.cldays.length);
    }, [newClassesData.cldays.length, newClassesData.clfor]);

    const updatePrice = (clfor, cldaysLength) => {
        let price = 0;
        // 대상이나 요일이 변경되었을 때 clprice 업데이트
        if (clfor && cldaysLength) {
            if (clfor === 'AD') {
                // 성인
                price = 30000 + (cldaysLength - 1) * 6000;
            } else {
                // 노인, 청소년, 아동
                price = 25000 + (cldaysLength - 1) * 5000;
            }
        }
        setNewClassesData(prevState => ({ ...prevState, clprice: price }));
    };

    console.log(newClassesData);

    // 강의 등록
    const ClassesRegister = (() => {
        let url = '/classes/classesInsert'

        apiCall(url, 'post', newClassesData, userData.token)
            .then(() => {
                navigate('/XClassesInfoControl', { state: { classesData: { ...newClassesData } } });
            }).catch((error) => {
                console.log("Classes Register error : ", error);
            })
    })

    return (
        <div className='XNewClassUpload'>
            <Submenu />
            <div className='XNewClassUpload_div'>
                <div className='XNewClassUpload_Title'>신규 수업 등록하기 </div>
                <table className='XNewClassUpload_table'>
                    <tbody>
                        <tr>
                            <th>대분류</th>
                            <td><select value={newClassesData.BT} onChange={NewClassesContent} name="BT" id="BT"
                                className='newClassesSelect'>
                                <option value="구기">구기</option>
                                <option value="수상">수상</option>
                                <option value="댄스">댄스</option>
                                <option value="라켓">라켓</option>
                                <option value="웨이트">웨이트</option>
                            </select></td>
                        </tr>
                        <tr>
                            <th>세부종목</th>
                            <td>
                                {newClassesData.BT == '구기' && (
                                    <select name="ST" id="ST"
                                        value={newClassesData.ST} onChange={NewClassesContent} className='newClassesSelect'>
                                        <option value="농구">농구</option>
                                        <option value="야구">야구</option>
                                        <option value="풋살">풋살</option>
                                    </select>
                                )}
                                {newClassesData.BT == '수상' && (
                                    <select name="ST" id="ST"
                                        value={newClassesData.ST} onChange={NewClassesContent} className='newClassesSelect'>
                                        <option value="수영">수영</option>
                                        <option value="다이빙">다이빙</option>
                                    </select>
                                )}
                                {newClassesData.BT == '댄스' && (
                                    <select name="ST" id="ST"
                                        value={newClassesData.ST} onChange={NewClassesContent} className='newClassesSelect'>
                                        <option value="K-POP">K-POP</option>
                                        <option value="벨리댄스">벨리댄스</option>
                                    </select>
                                )}
                                {newClassesData.BT == '라켓' && (
                                    <select name="ST" id="ST"
                                        value={newClassesData.ST} onChange={NewClassesContent} className='newClassesSelect'>
                                        <option value="탁구">탁구</option>
                                        <option value="배드민턴">배드민턴</option>
                                        <option value="테니스">테니스</option>
                                        <option value="스쿼시">스쿼시</option>
                                    </select>
                                )}
                                {newClassesData.BT == '웨이트' && (
                                    <select name="ST" id="ST"
                                        value={newClassesData.ST} onChange={NewClassesContent} className='newClassesSelect'>
                                        <option value="클라이밍">클라이밍</option>
                                        <option value="크로스핏">크로스핏</option>
                                        <option value="필라테스">필라테스</option>
                                    </select>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>수업 요일</th>
                            <td>
                                <label>
                                    <input type='checkbox' checked={newClassesData.cldays.includes('월')}
                                        onChange={() => handleDaySelect('월')} />월
                                </label>
                                <label>
                                    <input type='checkbox' checked={newClassesData.cldays.includes('화')}
                                        onChange={() => handleDaySelect('화')} />화
                                </label>
                                <label>
                                    <input type='checkbox' checked={newClassesData.cldays.includes('수')}
                                        onChange={() => handleDaySelect('수')} />수
                                </label>
                                <label>
                                    <input type='checkbox' checked={newClassesData.cldays.includes('목')}
                                        onChange={() => handleDaySelect('목')} />목
                                </label>
                                <label>
                                    <input type='checkbox' checked={newClassesData.cldays.includes('금')}
                                        onChange={() => handleDaySelect('금')} />금
                                </label>
                                <label>
                                    <input type='checkbox' checked={newClassesData.cldays.includes('토')}
                                        onChange={() => handleDaySelect('토')} />토
                                </label>
                                <label>
                                    <input type='checkbox' checked={newClassesData.cldays.includes('일')}
                                        onChange={() => handleDaySelect('일')} />일
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th>수업 시간</th>
                            <td>
                                <select value={newClassesData.cltime} onChange={(e) => handleTimeSelect(e.target.value)} className='newClassesSelect'>
                                    <option value='06:00'>06:00</option>
                                    <option value='07:00'>07:00</option>
                                    <option value='08:00'>08:00</option>
                                    <option value='09:00'>09:00</option>
                                    <option value='10:00'>10:00</option>
                                    <option value='11:00'>11:00</option>
                                    <option value='12:00'>12:00</option>
                                    <option value='13:00'>13:00</option>
                                    <option value='14:00'>14:00</option>
                                    <option value='15:00'>15:00</option>
                                    <option value='16:00'>16:00</option>
                                    <option value='17:00'>17:00</option>
                                    <option value='18:00'>18:00</option>
                                    <option value='19:00'>19:00</option>
                                    <option value='20:00'>20:00</option>
                                    <option value='21:00'>21:00</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>강좌 코드</th>
                            <td><input type="text" readOnly name='classcode' value={newClassesData.classcode} /></td>
                        </tr>
                        <tr>
                            <th>강좌명</th>
                            <td><input type="text" name='clname' value={newClassesData.clname} onChange={NewClassesContent} /></td>
                        </tr>
                        <tr>
                            <th>강사명</th>
                            <td><input type="text" placeholder='아래에서 강사 검색 후 등록버튼을 눌러 등록해주세요.' size={'50'} value={newClassesData.teachname} /></td>
                        </tr>
                        <tr className='XNewClassUpload_classAppDate'>
                            <th>강좌 신청 시작날</th>
                            <td><input type="date" name="clrequest" value={newClassesData.clrequest} onChange={NewClassesContent} /></td>
                        </tr>
                        <tr className='XNewClassUpload_classAppDate'>
                            <th>강좌 신청 마감날 </th>
                            <td><input type="date" name="clrequestend" value={newClassesData.clrequestend} onChange={NewClassesContent} /></td>
                        </tr>
                        <tr className='XNewClassUpload_startEnd'>
                            <th>강좌 시작 날짜 </th>
                            <td><input type="date" name='clstart' value={newClassesData.clstart} onChange={NewClassesContent} /></td>
                        </tr>
                        <tr className='XNewClassUpload_startEnd'>
                            <th>강좌 끝나는 날짜 </th>
                            <td><input type="date" name="clend" value={newClassesData.clend} onChange={NewClassesContent} /></td>
                        </tr>
                        <tr>
                            <th>강좌 대상 </th>
                            <td>
                                <select name="clfor" value={newClassesData.clfor} onChange={NewClassesContent}>
                                    <option value="KI">아동(만 12세 이하)</option>
                                    <option value="HT">청소년(만13세 ~ 18세)</option>
                                    <option value="AD">성인(만19세 ~ 64세)</option>
                                    <option value="OL">노인(만65세 이상)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>강좌 정원</th>
                            <td>
                                <input type="text" placeholder='숫자만 입력해주세요.' name='clcount'
                                    value={newClassesData.clcount} onChange={NewClassesContent} /> 명
                            </td>
                        </tr>
                        <tr>
                            <th>대기 정원</th>
                            <td>
                                <input type="text" placeholder='숫자만 입력해주세요.' name='clwaiting'
                                    value={newClassesData.clwaiting} onChange={NewClassesContent} /> 명
                            </td>
                        </tr>
                        <tr>
                            <th>강좌 금액</th>
                            <td>
                                <input type="text" placeholder='숫자만 입력해주세요.' name='clprice'
                                    value={newClassesData.clprice.toLocaleString()} onChange={NewClassesContent} /> 원
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='XNewClasseBtn'>
                    <button onClick={ClassesRegister}>강좌 등록</button>
                </div>

                <XlectureInfo onTeacherSelect={handleTeacherSelect} isSingleSelection={true} />
            </div>
        </div >
    )
}

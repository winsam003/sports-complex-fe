import './XSugangRequestSearchResult.css'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiCall } from '../apiService/apiService';
import { API_BASE_URL } from './../apiService/app-config';

export default function XSugangRequestSearchResult({ clnum, classcode, clname, clrequest, clrequestend, clstart, clend, cltime, clfor, clcount, clwaiting, clprice, cltype, classAppStatusCounts, setClassAppStatusCounts, onToggleCheckbox, isChecked }) {
    // 체크박스
    const handleCheckboxChange = (e) => {
        onToggleCheckbox(clnum);
    }

    // 사용자 페이지 접근
    const location = useLocation();

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 사용자 정보 및 수강 가능 여부를 확인하는 state
    const [memberCode, setMemberCode] = useState(null);

    // membercode 가져오기
    useEffect(() => {
        let url = '/member/mDetail';

        apiCall(url, 'post', userData, null)
            .then((response) => {
                setMemberCode(response.membercode);
            }).catch((error) => {
                console.log("membercode error : " + error);
            })
    }, [userData]);

    // date를 연월일시분 형식으로 표현
    const clstartdate = new Date(clstart).toLocaleString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour12: false
    }).replace(/\./g, '.').slice(0, -1);

    const clenddate = new Date(clend).toLocaleString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour12: false
    }).replace(/\./g, '.').slice(0, -1);

    // 대상자 유형을 표시
    const getTargetType = (clfor) => {
        switch (clfor) {
            case 'KI':
                return '아동';
            case 'HT':
                return '청소년';
            case 'AD':
                return '성인';
            case 'OL':
                return '노인';
            default:
                return '';
        }
    };

    // 가격 설정
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(clprice);

    // cltype 상태에 따른 수강 신청 관리
    const handleClassType = () => {
        switch (cltype) {
            case '신청 가능':
                handleAppSubmission("신청");
                break;
            case '대기 신청':
                handleAppSubmission("대기");
                break;
            case '대기 마감':
                alert('대기 인원이 가득 찼습니다. 다음 기회에 신청해주세요.');
                break;
            case '접수 마감':
                alert('접수 기간을 확인해주세요.');
                break;
            default:
                break;
        }
    };

    const handleAppSubmission = (cltype) => {
        if (memberCode && memberCode.substring(4, 6) === clfor) {
            let url = '/classApp/classAppInsert';

            const classAppData = {
                id: userData.id,
                clnum, clnum
            }

            apiCall(url, 'post', classAppData, userData.token)
                .then((response) => {
                    // alert(`${cltype} 성공`);
                    alert(`${cltype === "신청" ? "수강 신청 성공" : "대기 신청 성공"}`);
                    setClassAppStatusCounts(prevCounts => ({
                        ...prevCounts,
                        [clnum]: {
                            completed: cltype === "신청" ? (prevCounts?.completed ? prevCounts.completed + 1 : 1) : prevCounts?.completed || 0,
                            waiting: cltype === "대기" ? (prevCounts?.waiting ? prevCounts.waiting + 1 : 1) : prevCounts?.waiting || 0
                        }
                    }));
                }).catch((error) => {
                    console.log(cltype)
                    alert(`${cltype === "신청" ? "수강 신청 실패" : "대기 신청 실패"} : ${error}`);
                });
        } else {
            alert('수강 대상을 확인해주세요.');
        }
    };

    // 클래스 현재원과 대기원을 비교하여 표시
    const countRatio = `${classAppStatusCounts.completed}/${clcount}`;
    const waitingRatio = `${classAppStatusCounts.waiting}/${clwaiting}`;

    return (
        <div>
            <div className='XSugangRequestSearchResult'>
                <div className={location.pathname === '/Sugang' ? 'XSugangRequestSearchResult_content_sugang' : 'XSugangRequestSearchResult_content'}>
                    {
                        location.pathname == '/Sugang' ?
                            // 사용자
                            <>
                                <p>{clnum}</p>
                                <p>{clname}</p>
                                <p>{clstartdate}<br />- {clenddate}</p>
                                <p>{cltime}</p>
                                <p>{getTargetType(clfor)}</p>
                                <p>{countRatio}</p>
                                <p>{waitingRatio}</p>
                                <p>{formattedPrice}</p>
                                <p onClick={handleClassType}>{cltype}</p>
                            </>
                            :
                            // 관리자
                            <>
                                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}></input>
                                <p>{clnum}</p>
                                <p>{clname}</p>
                                <p>{clstartdate}<br />- {clenddate}</p>
                                <p>{cltime}</p>
                                <p>{getTargetType(clfor)}</p>
                                <p>{countRatio}</p>
                                <p>{waitingRatio}</p>
                                <p>{formattedPrice}</p>
                                <p>{cltype}</p>
                            </>
                    }
                </div>
            </div>
        </div >
    )
}
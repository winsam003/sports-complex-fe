import './PlaceRentalContent.css'
import Submenu from './Submenu'
import PlaceRentalSearchList from './PlaceRentalSearchList'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { apiCall } from '../apiService/apiService'

// 수강 신청
export default function PlaceRentalContent({ getUserName, getUserID, token }) {

    const navigate = useNavigate();

    const today = new Date();
    useEffect(() => {
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 1); // 오늘 날짜로부터 1일 뒤
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 3);

        const rentDateInput = document.getElementById('rentDate');
        rentDateInput.min = minDate.toISOString().split('T')[0];
        rentDateInput.max = maxDate.toISOString().split('T')[0];
    }, []);

    // 날짜 선택 값 td 안으로. 
    const [rentDate, setRentDate] = useState(today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate() + 1).padStart(2, '0'));
    const handleRentDate = (event) => {
        setRentDate(event.target.value);
    }

    // 시간 선택 값 td 안으로. 
    const [rentTime, setRentTime] = useState('06:00:00');
    const handleRentTime = (event) => {
        setRentTime(event.target.value);
    }

    // 인원 수 저장
    const [numOfPeople, setNumOfPeople] = useState(1);
    const useNumHandler = (e) => {
        setNumOfPeople(e.target.value);
    }

    // 가격 가져오기
    const [rentPrice, setRentPrice] = useState(0);
    const handleRentPrice = (value) => {
        setRentPrice(value);
    }

    const [appPhoneNum, setAppPhoneNum] = useState('');
    const appPhoneNumHandler = (e) => {
        setAppPhoneNum(e.target.value)
    }

    const [sprNum, setSprNum] = useState('');
    const sprNumHandler = (e) => {
        setSprNum(e);
    }

    // 해당 날짜, 시간 신청list 가져오기 ============================================================================
    // let token = null
    let sprDate = rentDate + ' ' + rentTime;
    const [spacelist, setSpaceList] = useState([]);
    useEffect(() => {
        // token = (sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).token);
        let url = '/spaceRentApp/spaceRentApplist';
        let requestData = {
            sprDate: sprDate,
        }

        apiCall(url, 'post', requestData, token)
            .then((response) => {
                setSpaceList(response);
            }).catch((error) => {
                setSpaceList(null);
                console.log("spaceRentAppList Error Occured: " + error);
            })
    }, [rentDate, rentTime])
    // 해당 날짜, 시간 신청list 가져오기 ============================================================================





    // 대관신청 ====================================================================================================
    const requestApp = () => {
        let url = '/spaceRentApp/appUserCheck';
        let requestData = {
            sprnum: sprNum,
            id: getUserID,
            appPhoneNum: appPhoneNum,
            numOfPeople: numOfPeople
        }

        let stfcheck = null;
        if (sessionStorage.getItem('userData') !== null) {
            stfcheck = JSON.parse(sessionStorage.getItem('userData')).stfid;
        }
        if (stfcheck) {
            alert("유저 아이디로만 허가 신청이 가능합니다.");
        } else {
            
            apiCall(url, 'post', getUserID, token)
                .then((response) => {
                    url = '/spaceRentApp/spaceRentApplication';
                    apiCall(url, 'post', requestData, token)
                        .then((response) => {
                            alert(response);
                            window.location.reload();
                        }).catch((error) => {
                            
                            alert("대관 신청에 실패하였습니다. 관리자에게 문의하세요.");
                            console.log("spaceRentApplication error occured = " + error);
                        })
                }).catch((error) => {
                    
                    alert("이미 신청한 내역이 있습니다.");
                })
        }
    }
    // 대관신청 ====================================================================================================


    return (
        <div className='board_div'>
            <Submenu />
            <div className='board_div_div'>
                <div className='PlaceRentalContent_infoTitleBox'>
                    <div className='PlaceRentalContent_infoTitle PlaceRentalContent_infoTitle1'>✔ 대관신청 안내</div>
                    <div>
                        &#42; 대관신청을 금일 기준 3일 이후 기간의 시설을 대관하실 수 있습니다.
                        &#42; 금일 기준 3일 이후의 시설은 매일 10시부터 예약 가능합니다.
                    </div>
                    <div className='PlaceRentalContent_infoTitle PlaceRentalContent_infoTitle2'>✔ 이용 절차</div>
                    <pre className='PlaceRentalContent_infoTitle_pre'>
                        01&#41; 홈페이지 예약신청 : 홈페이지&#40;http://rec.isdc.co.kr/ 에서 로그인후 사용허가 신청<br />
                        02&#41; 사용허가심의 : 담당자의 사용허가 심의<br />
                        03&#41; 허가통보 : 심의 후, 허가통보&#40;SMS 발송 및 담당자와 통화&#41;<br />
                        04&#41; 전용사용료납부 : 시설 이용료 결제&#40;홈페이지에서 결제-카드 & 계좌이체&#41;<br />
                        05&#41; 부속시설사용허가 : 행사 종료 이후, 부속시설 사용료를 정산하여 담당자가 통보<br />
                        06&#41; 부속사용료납부 : 담당자통보 후,3일 이내에 부속시설 사용료 납부&#40;시설 이용료 결제 방법과 동일&#41;<br />
                    </pre>
                </div>

                <div className='PlaceRentalContent_select'>
                    <span>날짜 선택</span>
                    <input type="date" className='selectRent' name="rentDate" id="rentDate" value={rentDate} onChange={handleRentDate} />
                    <span>시간 선택</span>
                    <select name="rentTime" className='selectRent' id="rentTime" value={rentTime} onChange={handleRentTime}>
                        <option value="06:00:00">오전 6시</option>
                        <option value="09:00:00">오전 9시</option>
                        <option value="12:00:00">오후 12시</option>
                        <option value="15:00:00">오후 3시</option>
                        <option value="18:00:00">오후 6시</option>
                    </select>
                </div>
                <PlaceRentalSearchList handleRentPrice={handleRentPrice} sprNumHandler={sprNumHandler} spacelist={spacelist} getUserID={getUserID} />
                <div className='PlaceRentalContent_formSet'>
                    <table>
                        <tbody>
                            <tr className='PlaceRentalContent_form'>
                                <th>날짜 선택 <span className='star'></span></th>
                                <td>{rentDate}</td>
                            </tr>
                            <tr className='PlaceRentalContent_form'>
                                <th>시간 선택 <span className='star'></span></th>
                                <td>{rentTime}</td>
                            </tr>
                            <tr className='PlaceRentalContent_form'>
                                <th>작성자 <span className='star'></span></th>
                                <td>{getUserName}</td>
                            </tr>
                            <tr>
                                <th>연락처 <span className='star'></span></th>
                                <td>
                                    <input type="text" name='phoneNum' id='phoneNum' value={appPhoneNum} onChange={appPhoneNumHandler} placeholder='연락가능한 연락처를 하이픈(-) 없이 입력해주세요' />
                                </td>
                            </tr>
                            <tr>
                                <th>이용 인원 <span className='star'></span></th>
                                <td>
                                    <input type="text" name='useNum' id='useNum' value={numOfPeople} onChange={useNumHandler} />
                                </td>
                            </tr>
                            <tr className='PlaceRentalContent_form'>
                                <th>가격 <span className='star'></span></th>
                                <td>
                                    {rentPrice} 원
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='RentalWriteButton'>
                    <button onClick={requestApp}>신청</button>
                </div>
            </div>
        </div>
    )
}
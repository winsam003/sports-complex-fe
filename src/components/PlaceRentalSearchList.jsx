import { useEffect, useState } from 'react'
import './PlaceRentalSearchList.css'
import { apiCall } from '../apiService/apiService';


export default function PlaceRentalSearchList({ handleRentPrice, sprNumHandler, spacelist, token, getUserID }) {

    // 가격 가져가기
    // 한개만 체크하기

    const [selectedCheckBox, setSelectedCheckBox] = useState(null);
    const handleRentPriceValue = (event) => {
        const spacecode = event.target.value;
        setSelectedCheckBox(spacecode);


        const isChecked = event.target.checked;
        const space = spacelist.find(item => item.spacecode.spacecode === spacecode);
        if (isChecked && space) {
            handleRentPrice(space.spacecode.spaceprice);
            sprNumHandler(space.sprnum);
        }

        // 선택된 체크박스가 다시 클릭되었을 때, 선택을 해제합니다.
        if (selectedCheckBox === spacecode) {
            setSelectedCheckBox(null);
            handleRentPrice(0);
        } else {
            setSelectedCheckBox(spacecode); // 클릭된 체크박스를 선택 상태로 변경합니다.
        }
    }

    const requestBattle = (sprnum, id) => {
        let url = '/spaceRentApp/requestBattle';
        let id2 = getUserID;
        token = (sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).token);

        if (id.id !== id2) {
            let numOfPeople2 = prompt("경기 신청할 인원을 입력해주세요", "숫자로만 입력해주세요");
            let appPhoneNum2 = prompt("연락 가능한 연락처를 입력해주세요", "하이픈('-') 없이 숫자로만 입력해주세요");
            let special = /^[0-9]+$/;
            if (special.test(numOfPeople2) && special.test(appPhoneNum2)) {
                let requestData = {
                    sprnum: sprnum,
                    id2 : id2,
                    appPhoneNum2: appPhoneNum2,
                    numOfPeople2: numOfPeople2,
                };
                apiCall(url, 'post', requestData, token)
                    .then((response) => {
                        alert("경기 접수가 완료되었습니다. 상대방이 경기를 수락한 후 경기신청이 완료됩니다.");
                        window.location.reload();
                    }).catch((error) => {
                        console.log('requestBattle Error Occured = '+error);
                    })
            } else {
                alert("숫자로만 입력해야합니다. 다시 신청해주세요");
            }
        }else{
            alert("다른 사람의 대관신청에만 경기신청이 가능합니다.");
        }

    }
// 0 일
// 1 월
// 2 화
// 3 수
// 4 목
// 5 금
// 6 토

    return (
        <div>
            <div className='PlaceRentalSearchList_div'>
                <div className='PlaceRentalSearchList_index'>
                    <span>선택</span>
                    <span>시설명</span>
                    <span>금액</span>
                    <span>구분</span>
                </div>

                {spacelist ? spacelist
                    .filter(({ spacecode }) => spacecode.spacecode.substring(2, 4) !== 'PA')
                    .map(({ spacecode, sprnum, id, id2 }, index) => (
                        <div key={index} className='PlaceRentalSearchList_content'>
                            <span className='PlaceRentalSearchList_number'>{sprnum}</span>
                            <span><input type="checkbox"
                                value={spacecode.spacecode}
                                checked={selectedCheckBox === spacecode.spacecode}
                                onChange={handleRentPriceValue}
                                disabled={id !== null ? true : false} /></span>
                            <span>{spacecode.spacename}</span>
                            <span>{spacecode.spaceprice} 원</span>
                            <span>
                                {new Date().getDay() === 1 || new Date().getDay() === 4 ?
                                    (id !== null ?
                                        <span>대관 불가 /
                                            <button className='PlaceRentalSearchList_battle' disabled={id2 === null ? false : true} onClick={() => requestBattle(sprnum, id)}>경기신청</button>
                                        </span> : '가능')
                                    :
                                    (id !== null ? '대관 불가' : '가능')
                                }
                            </span>
                        </div>
                    ))
                    :
                    <div className='PlaceRentalSearchList_info'>
                        10시 이후 대관 신청이 가능합니다.
                    </div>
                }

            </div>
        </div>
    )
}


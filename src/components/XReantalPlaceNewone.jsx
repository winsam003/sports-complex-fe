import { useEffect, useState } from 'react'
import './XReantalPlaceNewone.css'
import { useNavigate } from 'react-router';
import { apiCall } from '../apiService/apiService';

export default function XReantalPlaceNewone() {

    // =================== 카테고리 합쳐서 코드 만들기 =============================
    // 인서트

    const [formPlace, setFormPlace] = useState({
        spacecode: '', 
        spacename: '', 
        spaceprice: '', 
        parkspace: '1' 
    })
    console.log(formPlace);



    const [placeType, setPlaceType] = useState("");
    const [spacelist, setSpaceList] = useState([]);
    const [placeNumber, setPlaceNumber] = useState('');

    // 최종 코드 
    const [fullCode, setFullCode] = useState("");

    // 시설 코드 만들기
    const placeTypeCode = (e) =>{
        // placeType 담아주기.
        setPlaceType(e);
        // spacelist 불러오기. filter 거를 예정.

        let url = '/space/spacelist';
        apiCall(url, 'get', null, null)
            .then((list) => {
                setSpaceList(list.data);
            }).catch((error) =>{
                console.log("Error: ", error);
            })

    }

    const makePlaceNumber = (e) => {
        const number = parseInt(e, 10);
        setPlaceNumber(number);
    }

    useEffect(() => {
        console.log("placeType=" + placeType);

        // 시설 기본 코드
        const facilityCode = 'FE';
        // 주차장이면 F 아니면 C 
        let facilityLast = (placeType === 'PA'? 'F' : 'C');
        console.log(placeNumber);
        
        // 전체 코드 만들어주기. (기본코드 + 시설 타입 + 번호 + 코트/층)
        const fullCode = facilityCode + placeType + placeNumber + facilityLast;
        console.log("fullCode="+fullCode);
        // 담아주기
        setFullCode(fullCode);
        setFormPlace({
            ...formPlace, 
            spacecode: fullCode
        })
        
    }, [spacelist, placeNumber]);
    
    //===============================================================================================

    // 이름, 가격 Hook
    const [placeName, setPlaceName] = useState("");
    const [placePrice, setPlacePrice] = useState("");
    const [placeCount, setPlaceCount] = useState('');


    const makePlaceName = (e) => {
        setPlaceName(e);
        setFormPlace({
            ...formPlace, 
            spacename: e
        })
    }
    // console.log(placeName);
    
    const makePlacePrice = (e) => {
        setPlacePrice(e);
        setFormPlace({
            ...formPlace, 
            spaceprice: e
        })
    }
    // console.log(placePrice);
    
    const makePlaceCount = (e) => {
        setPlaceCount(e);
        setFormPlace({
            ...formPlace, 
            parkspace: (e === '' )? 1 : e
        })
        // 입력하지 않았을 때는 sql 제약조건  default 1 이 적용되었으면 좋겠다. 
        
    }
    // console.log(placeCount);

    
    //===============================================================================================


    // 등록 버튼. onClick
    const navigate = useNavigate(); 
    const spaceInsert = () => {
        console.log(formPlace);

        if(!placeType){
            alert('대관 시설 종류를 선택해주세요. ');
            return;
        }
        if(!placeName){
            alert('대관 시설명을 입력해주세요. ');
            return;
        }
        if(!placeNumber){
            alert('대관 시설 번호를 입력해주세요. ');
            return;
        }
        if(!placePrice){
            alert('대관 시설 가격을 입력해주세요. ');
            return;
        }


        let url = "/space/spaceInsert";
        let token = JSON.parse(sessionStorage.getItem("userData")).token;

        apiCall(url, 'post', formPlace, token)
            .then((response) => {
                alert(response);
                navigate('/XRentalPlaceControllPage');
            }).catch((error) =>{
                alert(`${placeNumber}번 은 이미 있는 시설 번호입니다. 다른 번호를 입력해주세요.`)
                console.error("spaceInsert error : ", error);
            })

    }


    return (
        <div>
            <div className='XReantalPlaceNewone'>
                
                <p>대관 시설 종류</p>
                <select name='placeType' id='placeType' value={placeType} 
                        onChange={ (e) => {placeTypeCode(e.target.value)}}>
                    <option value="" >선택</option>
                    <option value="BK" >농구장</option>
                    <option value="FT" >풋살장</option>
                    <option value="PA" >주차장</option>
                    <option value="TE" >테니스장</option>
                </select>
                
                <p>시설 이름</p>
                <input type="text" name='spacename' id='spacename'  
                                                placeholder='시설 이름을 입력하세요.'
                                                value={placeName}
                                                onChange={(e) => makePlaceName(e.target.value)} ></input>

                <p>시설 번호</p>
                <input type="number" name='spacenumber' id='spacenumber'
                                                placeholder='숫자만 입력해주세요.'
                                                value={placeNumber}
                                                onChange={(e) => makePlaceNumber(e.target.value)} />

                <p>시설 가격</p>
                <input type="text" name='spaceprice' id='placePrice' 
                                                placeholder='숫자를 입력하시오.'
                                                value={placePrice}
                                                onChange={(e) => makePlacePrice(e.target.value)} ></input>
                <p>시설 자리 수</p>
                <input type="text" name='placeCount' id='placeCount' 
                                                placeholder='입력하지 않으시면 자동 한 자리로 등록됩니다.'
                                                value={placeCount}
                                                onChange={(e) => makePlaceCount(e.target.value)} ></input>

            </div>
            <div className='XBtnInsertPrev'>
                <button name='submit' id='submit' onClick={spaceInsert}>등록</button>
                <button>목록</button> 
            </div>
        </div>
    )
}
import { apiCall } from '../apiService/apiService';
import './HistoryRentalContents.css'

export default function HistoryRentalContent({ sprnum, spacecode, sprdate, payment, id2, sprstate, token, sprstate2 }) {

    const spaceRentCancel = () => {
        let url = '/spaceRentApp/historyCancel?sprnum=' + sprnum;

        if (window.confirm("정말 취소하시겠습니까?")) {
            apiCall(url, 'get', null, token)
                .then((response) => {
                    alert(sprnum + " 번 신청이 취소되었습니다.");
                    window.location.reload();
                }).catch((error) => {
                    console.log("historyCancel error Occured = " + error);
                })
        }
    }

    const battleAgree = () => {
        let url = '/spaceRentApp/battleAgree?sprnum=' + sprnum;

        apiCall(url, 'get', null, token)
            .then((response) => {
                alert(sprnum + "번 경기가 수락되었습니다.");
                window.location.reload();
            }).catch((error) => {
                console.log("battleAgree error Occured = " + error);
            })
    }


    return (
        <div className="HistoryRentalContent_Box">
            <div className="HistoryRentalContent_list">
                <span>{sprnum}</span>
                <span>{spacecode.spacename}</span>
                <span>{sprdate}</span>
                <span>{spacecode.spaceprice}</span>
                <span>{payment}</span>
                {
                    sprstate2 === '경기신청' ?
                        <span>
                            경기신청 접수 <button onClick={battleAgree}>수락</button>
                        </span>
                    :
                    sprstate === '접수만료' ?
                        <span>
                            경기신청 종료
                        </span>
                    :
                    sprstate2 === '경기수락' ?
                        <span>
                            경기신청 수락
                        </span>
                    :
                        <span>
                            경기신청 접수중
                        </span>
                }
                {sprstate === "확정" ?
                    <span>확정 /
                        <button className='HistoryRentalContent_button' onClick={spaceRentCancel}>취소</button>
                    </span>
                    :
                    <span>{sprstate}</span>
                }
            </div>
        </div>
    )
}
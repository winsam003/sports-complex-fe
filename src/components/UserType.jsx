import { useState } from 'react';
import './UserType.css';
import { useNavigate } from 'react-router';

export default function UserType() {

    const navigate = useNavigate();

    const next = (code) => {
        navigate('/JoinPage3', { state: { memberType: code}});
    }


    const [INorFO, setInorFo] = useState(false);
    const pageHandler = () => {
        setInorFo(!INorFO);
    }

    const [memberCode, setMemberCode] = useState('ME');

    const plusMemberCode = (e) => {
        const newMemberCode = memberCode + e.target.value
        setMemberCode(newMemberCode);

        if (newMemberCode.length === 6){
            next(newMemberCode)
        }
    }
    return (
        <div>
            
                {!INorFO ? (
                    <div className='UserType_container'>
                    <button className='UserType_button UserType_kid' value='IN' onClick={(e)=>{pageHandler(); plusMemberCode(e);}}>내국인</button>
                    <button className='UserType_button UserType_adult' value='FO' onClick={(e) => { pageHandler(); plusMemberCode(e); }}>외국인</button>
                    </div>
                ) : (
                    <div className='UserType_container'>
                        <button className='UserType_button UserType_kid' value='KI' onClick={plusMemberCode}>아동</button>
                        <button className='UserType_button UserType_adult' value='AD' onClick={plusMemberCode}>성인</button>
                        <button className='UserType_button UserType_foreigner' value='OL' onClick={plusMemberCode}>65세 이상</button>
                    </div>
                )}
                
            
        </div>
    )
}
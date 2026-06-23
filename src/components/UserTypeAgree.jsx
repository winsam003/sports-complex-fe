import './UserTypeAgree.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function UserTypeAgree({ isCheckbox1Checked, isCheckbox2Checked, isCheckbox3Checked }) {
    const navigate = useNavigate();

    const handlePage = () => {

        !isCheckbox1Checked && !isCheckbox2Checked && !isCheckbox3Checked ? navigate('/JoinPage2') : alert("필수 약관에 동의가 필요합니다.");
    }

    return (

        <div className='UserTypeAgree_container'>
            <span onClick={handlePage} className='UserTypeAgree_button UserTypeAgree_Agree'>동의합니다.</span>
            <Link to="/" className='UserTypeAgree_button UserTypeAgree_Disagree'>동의하지 않습니다.</Link>
        </div>
    )
}
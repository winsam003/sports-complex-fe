import './PasswordChange.css';
import Submenu from "./Submenu";
import PasswordChangeDetail2 from "./PasswordChangeDetail2";

export default function PasswordChange({ token }){
    return(
        <div className="PasswordChange_Box">
            <Submenu />
            <PasswordChangeDetail2 token={token}/>
        </div>
    )
}
import './XlecturerRegister.css';
import Submenu from './Submenu';
import XlecturerRegisterDetail from './XlecturerRegisterDetail';

export default function XlecturerRegister(){
    return(
        <div className='XlecturerRegister_Box'>
            <Submenu />
            <XlecturerRegisterDetail />
        </div>
    )
}
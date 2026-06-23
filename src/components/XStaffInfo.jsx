import './XStaffInfo.css'
import Submenu from './Submenu';
import XStaffList from './XStaffList';

export default function XStaffInfo() {
    return (
        <div className='XStaffInfo_div'>
            <Submenu />
            <div className='XStaffInfo_div_div'>
                <XStaffList />
            </div>
        </div>
    )
}
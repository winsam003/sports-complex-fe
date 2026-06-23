import Submenu from './Submenu';
import XBoardControllInsertDetail from './XBoardControllInsertDetail';
import './XBoardControllInsert.css';


export default function XBoardControllInsert() {
    return (
        <div className='XBoardControllInsert_div'>
            <Submenu />
            <div className='XBoardControllInsert_contents'>
                <XBoardControllInsertDetail />
            </div>
        </div>
    )
}

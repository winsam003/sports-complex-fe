import Submenu from "./Submenu";
import QRCodeDetail from "./QRCodeDetail";
import './QRCode.css'

export default function QRCode({ getUserID }){
    return(
        <div className="QRCode_Box">
            <Submenu />
            <QRCodeDetail getUserID={getUserID}/>
        </div>
    )
}
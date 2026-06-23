import { useNavigate } from 'react-router';
import './XStaffdetail.css';

export default function XStaffdetail({ stfid, stfdmp, stflevel, stfpnum, stfname, stfcode, onToggleCheckbox, isChecked }) {
    const handleCheckboxChange = () => {
        onToggleCheckbox(stfid);
    };

    const navigate = useNavigate();
    const boardDetail = () => {
        navigate(`/XStaffModifyPage?stfid=${stfid}`, {
            state: {
                stfid: stfid,
                stfdmp: stfdmp,
                stflevel: stflevel,
                stfpnum: stfpnum,
                stfname: stfname,
                stfcode: stfcode,
            }
        });
    }

    return (
        <div className='XStaffdetail_contents'>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span onClick={boardDetail}>{stfid}</span>
            <span onClick={boardDetail}>{stfdmp}</span>
            <span onClick={boardDetail}>{stflevel}</span>
            <span  onClick={boardDetail}>{stfpnum}</span>
            <span  onClick={boardDetail}>{stfname}</span>
            <span  onClick={boardDetail}>{stfcode}</span>
        </div>
    )
}
import './XRentalPlaceRequestControllList.css'


export default function XRentalPlaceRequestControll({ sprnum, spacecode, sprdate, id, appphonenum, sprstate, appdate, userDelete, isChecked }) {

    const handleDelete = (e) => {
        userDelete(sprnum, e.target.checked);
    }


    return (
        <div className='XRentalPlaceRequestControll_SearchList'>
            <div className='XRentalPlaceRequestControll_content'>
                <span className='XRentalPlaceRequestControll_span'>
                    <input disabled={id === null ? true : false} checked={isChecked} type="checkbox" onChange={handleDelete} />
                </span>
                <p>{sprnum}</p>
                <p>{spacecode.spacename}</p>
                <p>{sprdate}</p>
                <p>{id ? id.name : ""}</p>
                <p>{appphonenum}</p>
                <p>{appdate}</p>
                <p>{sprstate}</p>
            </div>
        </div>
    )
}

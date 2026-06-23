import './XuserInfoListContents.css';

export default function XuserInfoListContents({ id, name, birth, phonenum, address, address1, address2, carnum, userDelete, isChecked }) {

    const handleDelete = (e) => {
        userDelete(id, e.target.checked);
    }

    return (
        <div className='XuserInfoListContents_Box'>
            <div className='XuserInfoListContents_contents'>
                <input checked={isChecked} type="checkbox" onChange={handleDelete} />
                <span>{id}</span>
                <span>{name}</span>
                <span>{birth}</span>
                <span>{phonenum}</span>
                <span>{address + address1 + address2}</span>
                <span>{`${carnum === "" ? "차랑미등록" : carnum}`}</span>
                {/* <span>{lectureCheck === 'true' ? "강사" : <button>강사등록</button>}</span> */}
            </div>
        </div>
    )
}
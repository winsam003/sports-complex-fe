import './PlaceRentalSearch.css'

export default function PlaceRentalSearch({ searchBoxHandler, KeyPressHandler, SearchBox }) {
    return (
        <div>
            <div className='PlaceRentalSearch_div'>
                <div className='PlaceRentalSearch_MainCategory'>
                    <span>대분류</span>
                    <select value={SearchBox.select_Big} className='PlaceRentalSearch_MainCategory_select' name='select_Big' onChange={searchBoxHandler}>
                        <option value="전체">전체</option>
                        <option value="테니스장">테니스장</option>
                        <option value="풋살장">풋살장</option>
                        <option value="농구장">농구장</option>
                    </select>
                </div>
                <div className='PlaceRentalSearch_SubCategory'>
                    <span>소분류</span>
                    <select value={SearchBox.select_Small} className='PlaceRentalSearch_SubCategory_select' name='select_Small' onChange={searchBoxHandler}>
                        <option value="전체">전체</option>
                        <option value="접수중">접수중</option>
                        <option value="확정">확정</option>
                        <option value="접수만료">접수만료</option>
                    </select>
                </div>
                <div className='PlaceRentalSearch_PlaceName'>
                    <span>이름 / 시설명</span>
                    <input type='text' name='keyword' value={SearchBox.keyword} onChange={searchBoxHandler} onKeyPress={KeyPressHandler}>
                    </input>
                </div>
            </div>
        </div>
    )
}
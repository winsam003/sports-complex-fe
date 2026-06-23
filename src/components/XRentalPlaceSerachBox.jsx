import { useState } from 'react'
import './XRentalPlaceSerachBox.css'

export default function XRentalPlaceSearchBox({onSearch}) {

    const [mainCategory, setMainCategory] = useState('전체');
    const [subCategory, setSubCategory] = useState('전체');
    const [searchValue, setSearchValue] = useState('');

    const handleMainCategoryChange = (event) => {
        setMainCategory(event.target.value);
    };
    
    const handleSubCategoryChange = (event) => {
        setSubCategory(event.target.value);
    };

    const handleSearch = () => {
        onSearch({
            mainCategory: mainCategory,
            subCategory: subCategory,
            searchValue: searchValue
        });
    }

    // 리셋 버튼 만들기 -> 초기화 시키기
    const handleResetSearchPlace = () =>{
        setMainCategory('전체');
        setSubCategory('전체');
        setSearchValue('');
    }

    return (
        <div>
            <div className='XRentalPlaceSearchBox_div'>
                <div className='XRentalPlaceSearchBox_MainCategory'>
                    <span>시설 대분류</span>
                    <select 
                        className='XRentalPlaceSearchBox_MainCategory_select'
                        value={mainCategory}
                        onChange={handleMainCategoryChange}>

                        <option value="전체">전체</option>
                        <option value="경기장">경기장</option>
                        <option value="주차장">주차장</option>
                    </select>
                </div>
                <div className='XRentalPlaceSearchBox_SubCategory'>
                    <span>시설 소분류</span>
                    <select 
                        className='XRentalPlaceSearchBox_SubCategory_select'
                        value={subCategory}
                        onChange={handleSubCategoryChange}>

                        <option value="전체">전체</option>
                        <option value="농구장">농구장</option>
                        <option value="풋살장">풋살장</option>
                        <option value="테니스장">테니스장</option>
                    </select>
                </div>
                <div className='XRentalPlaceSearchBox_Sugangtitle'>
                    <span>검색</span>
                    <input type='text'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)} />
                </div>
            </div>
            <div className='XRentalPlaceSearchBox_bottondiv'>
                <button className='XRentalPlaceSearchBox_botton' onClick={handleResetSearchPlace}>초기화</button>
                <button className='XRentalPlaceSearchBox_botton' onClick={handleSearch}>조회</button>
            </div>
        </div>
    )
}

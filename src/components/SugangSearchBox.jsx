import './SugangSearchBox.css'

export default function SugangSearchBox() {
    return (
        <div>
            <div className='SugangSearchBox_div'>
                <div className='SugangSearchBox_MainCategory'>
                    <span>대분류</span>
                    <select className='SugangSearchBox_MainCategory_select'>
                        <option value="">종목1</option>
                        <option value="">종목2</option>
                        <option value="">종목3</option>
                    </select>
                </div>
                <div className='SugangSearchBox_SubCategory'>
                    <span>소분류</span>
                    <select className='SugangSearchBox_SubCategory_select'>
                        <option value="">세부종목1</option>
                        <option value="">세부종목2</option>
                        <option value="">세부종목3</option>
                    </select>
                </div>
                <div className='SugangSearchBox_Sugangtitle'>
                    <span>강좌명</span>
                    <input type='text'>
                    </input>
                </div>
                <div className='SugangSearchBox_DaySelect'>
                    <span>요일 선택</span>
                    <select>
                        <option value="">월</option>
                        <option value="">화</option>
                        <option value="">수</option>
                        <option value="">목</option>
                        <option value="">금</option>
                        <option value="">토</option>
                        <option value="">일</option>
                    </select>
                </div>
                <div className='SugangSearchBox_EducationTarget'>
                    <span>교육 대상</span>
                    <select className='SugangSearchBox_EducationTarget_select'>
                        <option value="">어린이(만 12세 이하)</option>
                        <option value="">청소년(만13세 ~ 18세)</option>
                        <option value="">성인(만19세 ~ 64세)</option>
                        <option value="">어르신(만65세 이상)</option>
                    </select>
                </div>
            </div>
        </div >
    )
}
import './XclassSearchBox.css';
import { useState } from 'react';

export default function XclassSearchBox({ onSearch, onReset, classesSearchBTSelect, setClassesSearchBTSelect, classesSearchSTSelect, setClassesSearchSTSelect, classesSearchDaySelect, setClassesSearchDaySelect, classesSearchTargetSelect, setClassesSearcTargetSelect, classesSearchInput, setClassesSearchInput }) {

    // 검색
    const handleSearch = () => {
        onSearch(classesSearchBTSelect, classesSearchSTSelect, classesSearchDaySelect, classesSearchTargetSelect, classesSearchInput);
    }
    // 초기화
    const reset = () => {
        onReset();
    }

    return (
        <div className='XclassSearchBox_box'>
            <div className='XclassSearchBox_title'>강의정보</div>
            <div className='XclassSearchBox_division'>
                <span>대분류
                    <select value={classesSearchBTSelect} onChange={(e) => setClassesSearchBTSelect(e.target.value)} name="XclassSearchBox_MainCategory" id="XclassSearchBox_MainCategory">
                        <option value="전체">전체</option>
                        <option value="BA">구기</option>
                        <option value="WA">수상</option>
                        <option value="DC">댄스</option>
                        <option value="LA">라켓</option>
                        <option value="WE">웨이트</option>
                    </select>
                </span>
                <span>세부종목
                    {classesSearchBTSelect === '전체' && (
                        <select name="XclassSearchBox_SubCategory" id="XclassSearchBox_SubCategory"
                            value={classesSearchSTSelect} onChange={(e) => setClassesSearchSTSelect(e.target.value)}>
                            <option value="전체">전체</option>
                        </select>
                    )}
                    {classesSearchBTSelect === 'BA' && (
                        <select name="XclassSearchBox_SubCategory" id="XclassSearchBox_SubCategory"
                            value={classesSearchSTSelect} onChange={(e) => setClassesSearchSTSelect(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="BK">농구</option>
                            <option value="BS">야구</option>
                            <option value="FT">풋살</option>
                        </select>
                    )}
                    {classesSearchBTSelect === 'WA' && (
                        <select name="XclassSearchBox_SubCategory" id="XclassSearchBox_SubCategory"
                            value={classesSearchSTSelect} onChange={(e) => setClassesSearchSTSelect(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="SW">수영</option>
                            <option value="DI">다이빙</option>
                        </select>
                    )}
                    {classesSearchBTSelect === 'DC' && (
                        <select name="XclassSearchBox_SubCategory" id="XclassSearchBox_SubCategory"
                            value={classesSearchSTSelect} onChange={(e) => setClassesSearchSTSelect(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="KP">k-pop</option>
                            <option value="BD">벨리댄스</option>
                        </select>
                    )}
                    {classesSearchBTSelect === 'LA' && (
                        <select name="XclassSearchBox_SubCategory" id="XclassSearchBox_SubCategory"
                            value={classesSearchSTSelect} onChange={(e) => setClassesSearchSTSelect(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="PP">탁구</option>
                            <option value="BM">배드민턴</option>
                            <option value="TE">테니스</option>
                            <option value="SQ">스쿼시</option>
                        </select>
                    )}
                    {classesSearchBTSelect === 'WE' && (
                        <select name="XclassSearchBox_SubCategory" id="XclassSearchBox_SubCategory"
                            value={classesSearchSTSelect} onChange={(e) => setClassesSearchSTSelect(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="CL">클라이밍</option>
                            <option value="CR">크로스핏</option>
                            <option value="PI">필라테스</option>
                        </select>
                    )}
                </span>
            </div>
            <div className='XclassSearchBox_inputBox'>
                <span>강좌명 </span>
                <input className='XclassSearchBox_input' type="search" placeholder='검색할 강의를 입력해주세요'
                    value={classesSearchInput} onChange={(e) => setClassesSearchInput(e.target.value)} />
            </div>
            <div className='XclassSearchBox_target'>
                <span>요일선택
                    <select name="XclassSearchBox_classday" id="XclassSearchBox_classday"
                        value={classesSearchDaySelect} onChange={(e) => setClassesSearchDaySelect(e.target.value)}>
                        <option value="전체">전체</option>
                        <option value="월">월</option>
                        <option value="화">화</option>
                        <option value="수">수</option>
                        <option value="목">목</option>
                        <option value="금">금</option>
                        <option value="토">토</option>
                        <option value="일">일</option>
                    </select>
                </span>
                <span>교육대상
                    <select name="XclassSearchBox_MainCategory" id="XclassSearchBox_MainCategory"
                        value={classesSearchTargetSelect} onChange={(e) => setClassesSearcTargetSelect(e.target.value)}>
                        <option value="전체">전체</option>
                        <option value="KI">아동</option>
                        <option value="HT">청소년</option>
                        <option value="AD">성인</option>
                        <option value="OL">노인</option>
                    </select>
                </span>
            </div>
            <div className='XBtnResetSearch'>
                <button onClick={reset}>초기화</button>
                <button onClick={handleSearch}>조회</button>
            </div>
        </div >
    )
}
import './XSugangRequestList.css'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiCall } from '../apiService/apiService';
import { API_BASE_URL } from './../apiService/app-config';

export default function XSugangRequestList({ classappnum, member, classappdate, classappstate, classes, payment, classAppStatusCounts, setClassAppStatusCounts, onToggleCheckbox, isChecked }) {
    // 체크박스
    const handleCheckboxChange = (e) => {
        onToggleCheckbox(classappnum);
    }

    // date를 연월일시분 형식으로 표현
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const hours = String(formattedDate.getHours()).padStart(2, '0');
        const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const appdate = formatDate(classappdate);

    // 가격 설정
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(classes.clprice);

    return (
        <div>
            <div className='XSugangRequestList'>
                <div className='XSugangRequestList_content'>
                    <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}></input>
                    <p>{classappnum}</p>
                    <p>{member.id}</p>
                    <p>{appdate}</p>
                    <p>{classes.clnum}</p>
                    <p>{classes.clname}</p>
                    <p>{formattedPrice}</p>
                    <p>{classappstate}</p>
                    <p>{payment}</p>
                </div>
            </div>
        </div >
    )
}
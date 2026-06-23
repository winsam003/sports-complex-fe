import { useState } from 'react';
import PageBanner from '../PageBanner';
import TermsAndConditions from '../TermsAndConditions';
import UserTypeAgree from '../UserTypeAgree';
import { useLocation } from 'react-router';


export default function JoinPage1(){

    const [isCheckbox1Checked, setIsCheckbox1Checked] = useState("false");
    const [isCheckbox2Checked, setIsCheckbox2Checked] = useState("false");
    const [isCheckbox3Checked, setIsCheckbox3Checked] = useState("false");

    const agreeCheck1 = () => {
        setIsCheckbox1Checked(!isCheckbox1Checked);
    };

    const agreeCheck2 = () => {
        setIsCheckbox2Checked(!isCheckbox2Checked);
    };

    const agreeCheck3 = () => {
        setIsCheckbox3Checked(!isCheckbox3Checked);
    };

    return (
        <div>
            <PageBanner />
            <TermsAndConditions isCheckbox1Checked={isCheckbox1Checked} isCheckbox2Checked={isCheckbox2Checked} isCheckbox3Checked={isCheckbox3Checked} 
                                agreeCheck1={agreeCheck1} agreeCheck2={agreeCheck2} agreeCheck3={agreeCheck3}  />
            <UserTypeAgree isCheckbox1Checked={isCheckbox1Checked} isCheckbox2Checked={isCheckbox2Checked} isCheckbox3Checked={isCheckbox3Checked} />
        </div>
    )
}
import React from 'react';
import LovelyHome from '../LovelyHome/LovelyHome';
import style from './lovelyhomedetail.module.scss';

function LovelyHomeDetail({ homesDetails }) {
    return (
        <div className={style.LovelyHome_detail}>
            <h2>Khách sạn nổi bật</h2>
            <div className={style.LovelyHome_detail_main}>
                {homesDetails?.map((details, i) => (
                    <LovelyHome hmDetails={details} key={i} />
                ))}
            </div>
        </div>
    );
}

export default LovelyHomeDetail;

import React from 'react';
import LovelyHome from '../LovelyHome/LovelyHome';
import style from './lovelyhomedetail.module.scss';

function LovelyHomeDetail({ homesDetails }) {
    return (
        <div className={style.LovelyHome_detail}>
            <h2>Các phòng nổi bật</h2>
            <div className={style.LovelyHome_detail_main}>
                {homesDetails?.map((details, i) => {
                        if (i < 4) return <LovelyHome hmDetails={details} key={i} />
                        else return null;
                    }
                )}
            </div>
        </div>
    );
}

export default LovelyHomeDetail;

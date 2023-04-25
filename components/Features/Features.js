import Image from 'next/image';
import React from 'react';
import item1 from '../../images/img1.jpg';
import item2 from '../../images/img2.jpg';
import item3 from '../../images/img3.jpg';
import style from './features.module.scss';

function Features({ propertyList }) {
    return (
        <div className={style.feature_sec}>
            <div className={style.feature_sec_main}>
                <div className={style.feature_item}>
                    <Image src={item1} className={style.feature_item_img} />
                    <div className={style.feature_item_txt}>
                        <h1>TP.Hồ Chí Minh</h1>
                        <h2>{propertyList?.length} phòng</h2>
                    </div>
                </div>

                <div className={style.feature_item}>
                    <Image src={item2} className={style.feature_item_img} />
                    <div className={style.feature_item_txt}>
                        <h1>Đà Lạt</h1>
                        <h2>{propertyList?.length} phòng</h2>
                    </div>
                </div>

                <div className={style.feature_item}>
                    <Image src={item3} className={style.feature_item_img} />
                    <div className={style.feature_item_txt}>
                        <h1>Đà Nẵng</h1>
                        <h2>{propertyList?.length} phòng</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;

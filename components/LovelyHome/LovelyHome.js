import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from './LovelyHome.module.scss';

function LovelyHome({ hmDetails }) {
    return (
        <div className={style.lovely_home}>
            <div>
                <Image
                    className={style.lovely_home_img}
                    src={hmDetails.hotel_img}
                    alt="Lovely Hotel"
                    height={200}
                    width={250}
                />
            </div>

            <Link href={`/hotels/${hmDetails.hotel_id}`}>
                <h3 style={{fontSize: "1.2em"}}>{hmDetails.hotel_name}</h3>
            </Link>
            <p style={{ textTransform: 'capitalize', marginTop: "16px" }}>{hmDetails.hotel_desc}</p>

            <div className={style.lovely_home_btm}>
                <span>{hmDetails.hotel_star}</span>
                {hmDetails.hotel_star > 4 ? <p style={{marginBottom: 0}}>Tuyệt vời</p> : <p style={{marginBottom: 0}}>Đặc biệt</p>}
            </div>
        </div>
    );
}

export default LovelyHome;

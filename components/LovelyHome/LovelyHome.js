import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from './LovelyHome.module.scss';

function LovelyHome({ hmDetails }) {
    console.log(hmDetails);
    const imgs = hmDetails.room_imgs.split(',') || []
    return (
        <div className={style.lovely_home}>
            <div>
                <Image
                    className={style.lovely_home_img}
                    src={imgs[0]}
                    alt="Lovely Hotel"
                    height={200}
                    width={250}
                />
            </div>

            <Link href={`/rooms/${hmDetails.room_id}`}>
                <h3 style={{fontSize: "1.2em"}}>{hmDetails.room_name}</h3>
            </Link>
            <p style={{ textTransform: 'capitalize', marginTop: "16px" }}>{hmDetails.room_desc}</p>

            <div className={style.lovely_home_btm}>
                <span>{5}</span>
                {5 > 4 ? <p style={{marginBottom: 0}}>Tuyệt vời</p> : <p style={{marginBottom: 0}}>Đặc biệt</p>}
            </div>
        </div>
    );
}

export default LovelyHome;

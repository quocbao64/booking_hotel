/* eslint-disable prettier/prettier */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import noPhoto from '../../images/no hotel.jpg';
import style from './searchitem.module.scss';

function SearchItem({ results }) {
    const imgs = results.room_imgs?.split(',') || [];
    console.log(results);
    return (
        <div className={style.search_item}>
            <Link href={`/hotels/${results?.hotel_id}`}>
                <div className={style.search_item_img} style={{ position: 'relative' }}>
                    <Image src={imgs.length > 0 ? imgs[0] : noPhoto} height={260} width={270} layout="responsive" alt="Hotels"  />
                </div>
            </Link>

            <div className={style.search_item_details}>
                <Link href={`/rooms/${results?.room_id}`}>
                    <h3>{results?.room_name}</h3>
                </Link>
                <p>{results?.room_desc}</p>
                <p>Giá: <span style={{fontWeight: 500}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(results?.room_price))}</span></p>
                <p >Số giường:  <span style={{fontWeight: 500}}>{results?.room_beds}</span></p>
                {/* <div className={style.search_item_bed}>
                    <p style={{ marginRight: '8px' }}>
                        <FaBed size={19} className={style.search_item_bed_icon} /> {results?.rooms.length}
                    </p>
                    <p>
                        <FaBath className={style.search_item_bed_icon} />
                        {results?.bathroom}
                    </p>
                </div> */}
            </div>

            <div className={style.search_item_pricing}>
                <div className={style.search_item_priceing_rating}>
                    <p className={style.priceing_rating} style={{marginBottom: 0}}>Đánh giá</p>
                    <span>{(Math.random() * (5 - 3) + 3).toFixed(1)}</span>
                </div>
                <div className={style.search_item_price}>
                    {/* <p>${results.price}</p> */}

                    <Link href={`/rooms/${results.room_id}`}>
                        <button type="button">Xem chi tiết</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;

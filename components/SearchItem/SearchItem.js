/* eslint-disable prettier/prettier */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import noPhoto from '../../images/no hotel.jpg';
import style from './searchitem.module.scss';

function SearchItem({ results }) {
    console.log(results);
    return (
        <div className={style.search_item}>
            <Link href={`/hotels/${results?.hotel_id}`}>
                <div className={style.search_item_img} style={{ position: 'relative' }}>
                    <Image src={results?.hotel_img !== null ? results?.hotel_img : noPhoto} height={260} width={270} layout="responsive" alt="Hotels"  />
                </div>
            </Link>

            <div className={style.search_item_details}>
                <Link href={`/hotels/${results?.hotel_id}`}>
                    <h3>{results?.hotel_name}</h3>
                </Link>
                <p>{results?.hotel_address}</p>
                <p>{results?.hotel_phone}</p>
                <p >{results?.hotel_desc}</p>
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
                    <span>{results?.hotel_star}</span>
                </div>
                <div className={style.search_item_price}>
                    {/* <p>${results.price}</p> */}

                    <Link href={`/hotels/${results.hotel_id}`}>
                        <button type="button">Xem chi tiết</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;

import Link from 'next/link';
import React from 'react';
import style from './footerIte.module.scss';

function FooterItem({ footerDetail, footerHeader }) {
    return (
        <div className={style.footer_item}>
            <h2>{footerHeader}</h2>
            {footerDetail.map((detail, index) => (
                detail.to !== undefined ? (
                    <Link href={detail.to} key={index}>
                        <p>{detail.link}</p>
                    </Link>
                    ) : (
                    <div style={{display: "flex", alignItems: "center", marginBottom: "20px"}}>
                        {detail.icon}
                        <p style={{marginBottom: 0, marginLeft: "10px"}} key={index}>{detail.link}</p>
                    </div>
                )
            ))}
        </div>
    );
}

export default FooterItem;

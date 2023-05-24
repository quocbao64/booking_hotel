import Image from 'next/image';
import React from 'react';
import warning from '../images/warning.png';
import styles from '../styles/notfound.module.scss';

function PageNotFound() {
    return (
        <div className={styles.pageNotFound}>
            <div className={styles.pageNotFound_main}>
                <Image
                    src={warning}
                    className={styles.image}
                    height={250}
                    width={250}
                    alt="Not found page"
                />
                <h1>404 Không tìm thấy trang.</h1>
            </div>
        </div>
    );
}

export default PageNotFound;

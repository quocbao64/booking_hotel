import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import style from './features.module.scss';
import img1 from "/images/slider-2.jpg";
import img2 from "/images/slider-3.jpg";
import img3 from "/images/slider-5.jpg";
import img4 from "/images/slider-6.jpg";
import img5 from "/images/slider-7.jpg";

function Features({ propertyList }) {
    return (
        <div className={style.feature_sec}>
            <Carousel interval={3000}>
                <Carousel.Item>
                    <Image src={img1} width={1224} layout="intrinsic" height={600} />
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={img2} width={1224} layout="intrinsic" height={600} />
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={img3} width={1224} layout="intrinsic" height={600} />
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={img4} width={1224} layout="intrinsic" height={600} />
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={img5} width={1224} layout="intrinsic" height={600} />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Features;

'use client'

import React, { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import { Button } from '../components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';


export default function VirtualSwiper() {

    const swiperRef = useRef<SwiperType | null>(null);
    const appendNumber = useRef(500);
    const prependNumber = useRef(1);

    const [slides, setSlides] = useState(
        Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
    );

    const prepend = () => {
        setSlides([
            `Slide ${prependNumber.current - 2}`,
            `Slide ${prependNumber.current - 1}`,
            ...slides,
        ]);
        prependNumber.current = prependNumber.current - 2;
        swiperRef.current?.slideTo(swiperRef.current.activeIndex + 2, 0);
    };

    const append = () => {
        setSlides([...slides, 'Slide ' + ++appendNumber.current]);
    };

    const slideTo = (index: number) => {
        swiperRef.current?.slideTo(index - 1, 0);
    };

    return (
        <div className="flex flex-col w-full h-full gap-4 ">
            <div className="block rounded-md overflow-hidden h-full">
                <ReactSwiper {...{
                    modules: [Virtual, Mousewheel],
                    onSwiper: swiper => {
                        swiperRef.current = swiper;
                    },
                    slidesPerView: 7,
                    centeredSlides: false,
                    spaceBetween: 1, 
                    slidesPerGroupAuto: true,
                    mousewheel: {
                        forceToAxis: true,
                        // sensitivity: 10,
                        // thresholdDelta: 30,
                        // thresholdTime: 100,
                        // releaseOnEdges: true
                    },
                    virtual: true,
                    direction: 'horizontal',
                    "aria-orientation": 'horizontal',
                    className: "h-full"
                }}
                >
                    {slides.map((slideContent, index) => (
                        <SwiperSlide key={slideContent} {...{
                            virtualIndex: index,
                            className: "bg-[#202020]"
                        }}>
                            <div className="flex flex-col w-full p-4 h-full">
                                {slideContent}
                                <p>Slide content herex</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </ReactSwiper>
            </div>

            {/* <div className="flex w-full justify-center gap-4">

                <Button {...{
                    variant: "outline",
                    onClick: e => swiperRef.current?.slidePrev()
                }}>
                    <ChevronLeftIcon />
                    Previous
                </Button>
                <Button {...{
                    variant: "outline",
                    onClick: e => swiperRef.current?.slideNext()
                }}>
                    Next
                    <ChevronRightIcon />
                </Button>
            </div> */}
        </div>
    );
}
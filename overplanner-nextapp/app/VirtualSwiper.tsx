'use client'

import React, { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import { Button } from '../components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import OvrDate from '@/lib/OvrDate';
import { cn } from 'cn';


const handleCreateDateArray = (target: OvrDate) => {
    const start = target.getStartOf('week').toMidnight().add(-3, 'weeks');
    const end = target.getStartOf('week').to1159().add(4, 'weeks');

    const initialDates = [start];
    let curr = start.add(1, 'weeks');
    while (initialDates.length < 7) {
        initialDates.push(curr);
        curr = curr.add(1, 'weeks');
    }
    return initialDates;
}

export default function VirtualSwiper() {

    console.log("Virtual swiper")

    const swiperRef = useRef<SwiperType | null>(null);
    const appendNumber = useRef(500);
    const prependNumber = useRef(1);

    const buffer = 7
    const keep = 30

    const loadingStart = useRef(false)
    const loadingEnd = useRef(false)
    const trimming = useRef(false)

    const [activeSlide, setActiveSlide] = useState(1);
    const [dates, setDates] = useState(handleCreateDateArray(new OvrDate(new Date(), 'America/Chicago')))

    const slideTo = (index: number) => {
        swiperRef.current?.slideTo(index - 1, 0);
    };


    return (
        <div className="flex flex-col w-full h-full gap-4 ">
            <div className="block rounded-md overflow-hidden h-[30vh]">
                <ReactSwiper {...{
                    modules: [Virtual, Mousewheel],
                    onSwiper: swiper => {
                        swiperRef.current = swiper;
                    },
                    initialSlide: 3,
                    slidesPerView: 1,
                    centeredSlides: false,
                    spaceBetween: 1,
                    slidesPerGroupAuto: true,
                    // freeMode: {
                    //     enabled: true,
                    //     sticky: true,
                    //     momentumRatio: 1.5,
                    //     momentumVelocityRatio: 1.5,
                    // },
                    mousewheel: {
                        forceToAxis: true,
                        sensitivity: 1,
                        releaseOnEdges: true,
                    },
                    onInit: () => {
                        console.log("swiper init")
                    },
                    onSlideChangeTransitionEnd: (swiper) => {
                        const activeIndex = swiper.activeIndex;
                        setActiveSlide(activeIndex)
                        if (activeIndex == 1) {
                            setDates(prev => handleCreateDateArray(prev[1]))
                            swiper.slideTo(3, 0);
                        }
                        else if (activeIndex == 5) {
                            setDates(prev => handleCreateDateArray(prev[5]))
                            swiper.slideTo(3, 0);
                        }
                    },
                    virtual: true,
                    direction: 'horizontal',
                    "aria-orientation": 'horizontal',
                    className: "h-full"
                }}
                >
                    {dates.map((date, index) => (
                        <SwiperSlide key={date.print("MMM dd")} {...{
                            virtualIndex: index,
                            className: "bg-[#202020]"
                        }}>
                            <div className={cn(
                                "flex flex-col w-full h-full",

                            )}>
                                <div className={cn(
                                    "flex flex-col w-full p-4",
                                    date.getIsLocalToday('America/Chicago') ? 'bg-red-400 text-white' : 'text-white'
                                )}>
                                    <span>{index}</span>
                                    <span>{date.print("EEE")}</span>
                                    <span>{date.print("MMM dd, yyyy")}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </ReactSwiper>
            </div>

            <div className="flex flex-col">
                <p className="debug">{JSON.stringify({
                    activeSlide,
                    "dates.length": dates.length
                })}</p>
                <p className="debug">{JSON.stringify(dates.map(x => x.print("EEE, yyyy-MM-dd")))}</p>
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
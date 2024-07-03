import React, { useState, useEffect,useRef } from 'react';

type Props={
    imageUrls:string[]
}

const ImageCarousel = ({ imageUrls }:Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const carouselRef = useRef(null);
    useEffect(()=>{
            const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                root: null, 
                threshold: 0.1, 
            }
            );

            if (carouselRef.current) {
            observer.observe(carouselRef.current);
            }

            return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
            };
    },[])
    useEffect(() => {
        if(!isInView) return;

        const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 3000); 

        return () => clearInterval(timer);
    }, [isInView,imageUrls.length]);

    return (
        <div ref={carouselRef} className="w-full h-[300px] relative">
        {imageUrls.map((url:string, index:number) => (
            <img
            key={url}
            src={url}
            className={`w-full h-full object-cover object-center absolute transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            alt=""
            />
        ))}
        </div>
    );
    };

export default ImageCarousel;
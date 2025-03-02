import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ customerId }) => {
    const [highlightedDay, setHighlightedDay] = useState(15);
    const [optimizedSchedule, setOptimizedSchedule] = useState({});
    const [dailySavings, setDailySavings] = useState({});
    const [explanations, setExplanations] = useState({});
    const [totalSavings, setTotalSavings] = useState(0);
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/optimize?customer_id=${customerId}`);
                const data = await response.json();
                console.log("Fetched data:", data);
                setOptimizedSchedule(data.optimized_schedule);
                setDailySavings(data.daily_savings);
                setExplanations(prevExplanations => ({
                    ...prevExplanations,
                    ...data.explanation // Assuming data.explanation is an object with days as keys
                }));

                setTotalSavings(data.total_savings);
            } catch (error) {
                console.error("Error fetching optimized schedule:", error);
            }
        };

        fetchData();
    }, [customerId]);

    const handleScroll = (e) => {
        if (!containerRef.current) return;

        const container = e.target;
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const centerY = scrollTop + containerHeight / 2;

        let closestDay = highlightedDay;
        let closestDistance = Infinity;

        const dayElements = Array.from(container.querySelectorAll('.day-item'));
        dayElements.forEach((elem, index) => {
            const day = days[index];
            const rect = elem.getBoundingClientRect();
            const elemCenterY = rect.top + rect.height / 2;
            const distance = Math.abs(elemCenterY - (container.getBoundingClientRect().top + containerHeight / 2));

            if (distance < closestDistance) {
                closestDistance = distance;
                closestDay = day;
            }
        });

        if (closestDay !== highlightedDay) {
            setHighlightedDay(closestDay);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.paddingTop = '150px';
            containerRef.current.style.paddingBottom = '150px';
        }
    }, []);

    return (
        <div
            className="carousel-container"
            ref={containerRef}
            onScroll={handleScroll}
        >
            {days.map((day) => (
                <div
                    key={day}
                    className={`day-item ${day === highlightedDay ? 'highlighted' : ''}`}
                >
                    {day === highlightedDay ? (
                        <div className="payment-card">
                            <div className="payment-header">
                                <div className="payment-icon">💰</div>
                                <div className="payment-title">Day {day}</div>
                            </div>
                            <div className="payment-content">
                                <div className="payment-left">
                                    <div className="label">Balance:</div>
                                    <div className="label">${optimizedSchedule[day]?.toFixed(2) || '0.00'}</div>
                                </div>
                                <div className="payment-right">
                                    <div className="amount-saved">
                                        Savings: <span className="positive-amount">+ ${dailySavings[day]?.toFixed(2) || '0.00'}</span>
                                    </div>
                                    {explanations[day] && explanations[day].trim() !== '' && explanations[day] !== 'No payment made' && explanations[day] !== 'No payment made today.' && (
                                        <div className="explanation">{explanations[day]}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="day-number">Day {day}</div>
                    )}
                </div>
            ))}
            <div className="total-savings">
                Total Savings: <span className="positive-amount">+ ${totalSavings.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default Carousel;
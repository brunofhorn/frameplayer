import React, { useEffect, useState, useRef } from "react";
import formatMSS from "../functions/formatMSS";
import images from "../utils/images";
import Slider from '@mui/material/Slider';

export default (props) => {
    const {frames = [], fps} = props;
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const [paused, setPaused] = useState(true);
    const [atualTime, setAtualTime] = useState(0);
    const totalTime = (1 / (fps ?? 0.2)) * frames?.length;
    const delay = 1000 / (fps ?? 0.2);
    const [marks, setMarks] = useState([]);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    function moveSlide(value){
        setPaused(true);
        setAtualTime(value);
        
        let idx = marks.find((mark) => mark.value == value);
        
        setIndex(idx.index);
    }

    useEffect(()=>{
        let m = [];

        m.push({index: 0, value: 0});

        frames.map((_, index) => {
            m.push({index, value: (index * (totalTime / frames.length) + frames.length)})
        });

        setMarks(m);
    },[]);

    useEffect(()=>{
        if(!paused){
            if(atualTime < totalTime){
                setTimeout(()=>{
                    setAtualTime(atualTime + 1);
                },1000);
            }else{
                setAtualTime(totalTime);
                setIndex(frames.length - 1);
                setPaused(true);
            }
        }
    },[atualTime, paused]);

    useEffect(() => {
        resetTimeout();
        if(!paused){
            timeoutRef.current = setTimeout(() =>
                setIndex((prevIndex) =>
                  prevIndex === frames.length - 1 ? 0 : prevIndex + 1
                ),
                delay
            );
        }

        return () => {
            resetTimeout();
        };
      }, [paused, index]);

    return (
        <div style={{maxWidth: 500, overflow: 'hidden', margin: 0}}>
            <div style={{ transform: `translate3d(${-index * 100}%, 0, 0)`, whiteSpace: 'nowrap', transition: "ease 1000ms"}}>
                {frames.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        step={(index * (totalTime / frames.length) + frames.length)}
                        style={{display: 'inline-block',height: 400, width: '100%',borderRadius: 12, backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{display: 'flex', flex: 1, cursor: 'pointer'}} onClick={()=> setPaused(!paused)}>
                    <img src={!paused ? images.pause : images.play} style={{width: 25, height: 25}} />
                </div>
                <div style={{display: 'flex', flex: 1, fontSize: 12, justifyContent: 'flex-start'}}>{formatMSS(atualTime)}</div>
                <div style={{display: 'flex', flex: 10}}>
                    <div style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Slider
                            value={atualTime}
                            valueLabelDisplay="auto"
                            step={totalTime / frames.length}
                            marks={marks}
                            min={0}
                            max={totalTime}
                            onChange={(_, value)=> moveSlide(value)}
                        />
                    </div>
                </div>
                <div style={{display: 'flex', flex: 1, fontSize: 12, justifyContent: 'flex-end'}}>{formatMSS(totalTime)}</div>
            </div>
        </div>
    )
}
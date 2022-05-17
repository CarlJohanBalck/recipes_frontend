import React, {useState, useEffect} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import "../App.scss";
import * as imageLoader from '../assets/prepare-food.json';
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi' 
import Card from './Card'

function Recepies(props) {

    const [recepies, setRecepies] = useState({
            done: false,
            recepiesList: [],
            selected: false
    });
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: imageLoader.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    
    useEffect(() => {
        setRecepies({done: false});
        // fetch("http://192.168.1.4:5001/Siri/Recepies")
        fetch("http://localhost:3000/recepies")
        .then(response => response.json())
        .then(json => {
            setRecepies({
                recepiesList: json,
                done: true    
            })
        })
        .catch(function() {
            console.log("error")
        })
    }, [])

    const {recepiesList, done, selected} = recepies;
    console.log("SELECTED: ", selected)
    return (
        <React.Fragment>
                <div>
                    {!done ? (
                        <FadeIn>
                            <div className="lottie">
                                <h2>Hämtar recept från Raspberry Pi</h2>
                            </div>
                            <Lottie options={defaultOptions} height={241} width={352} />
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            {recepiesList.map((recept, index) => (
                                <Card
                                    key={index}
                                    recepie={recept}
                                    index={index}
                                >{recept[0]}</Card>
                                
                            ))}
                            
                        </FadeIn>
                    )}
                </div>
            </React.Fragment>
    );
}

export default Recepies;
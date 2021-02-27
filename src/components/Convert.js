import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Convert = ({ language, text }) => {
    const [output, setOuput] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    /**Inside this useEffect, we want to update the debounscedText state only when a user types and wait for 6millsec
     * Each time the user types before 6milsec, we cancel d timer, hence debouncedText is not updated
     */
    useEffect(() => {
        const timerId = setTimeout(() => {
                setDebouncedText(text);
        }, 700);

        // Return a clean up function to clear initial timer if the user types again b4 6millisec
        return () => {
            clearTimeout(timerId);
        }
    }, [text]);

    useEffect( () => {

        const doTranslation = async () => {
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                },
            });

            setOuput(data.data.translations[0].translatedText);
        };

        doTranslation();

    }, [language, debouncedText]);

    return(
        <div>
            <h1 className="ui header">{output}</h1>
        </div>
    );
}

export default Convert;
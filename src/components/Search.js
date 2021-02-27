import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default () => {

    const [term, setTerm] = useState('Programming');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    useEffect( () => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term)
        }, 600);

        return () => {
            clearTimeout(timerId);
        }
    }, [term]);

    // make call anytime 'term' changes
    /** We delay for 6 milliseconds b4 making axios call so we do not end up making so many api calls
    for every key d user presses which updates term */

    useEffect( () => {
        // 1st argement to useEffect() & we can only return a function from it if we need to return sth
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            });

            setResults(data.query.search);
        };
        search();

    }, [debouncedTerm]);

    const renderedResults = results.map( article => {
            return (
                <div key={article.pageid} className="item">

                    <div className="right floated content">
                        <a className="ui button" href={`https://en.wikipedia.org?curid=${article.pageid}`} target="_blank">Go</a>
                    </div>

                    <div className="content">
                        <div className="header">{article.title}</div>
                        <span dangerouslySetInnerHTML={{__html: article.snippet}}></span>
                    </div>

                </div>
            );
        })

    return(
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                        type="text"
                        value={term}
                        onChange={ e => setTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}
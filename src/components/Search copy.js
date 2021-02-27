import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default () => {

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    // make call anytime 'term' changes
    useEffect( () => {
        // 1st argement to useEffect() & we can only return a function from it if we need to return sth
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            });

            setResults(data.query.search);
        }

        //Invoke function.
        const timeoutId = setTimeout( () => {
            if (term) {
                search();
            }
        }, 600);

        return () => {
            clearTimeout(timeoutId);
        };
        
    }, [term]);

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
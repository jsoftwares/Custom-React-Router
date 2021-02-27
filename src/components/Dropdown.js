import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({label, options, selected, onSelectedChange}) => {

    const [open, setOpen] = useState(false);
    const ref = useRef();

    /**We want to ensure when outside of dropdown is clicked that open is set to false which removes d classes that make our it show. This 
     * works but causes a bug bcos when our dropdown items are not clicked, it doesn't close. We solve this using ref by not setting OPEN
     * to false if d target element contains are current ref.
     */
    useEffect( () => {
        const onBodyClick = (event) => {

            if (ref.current && ref.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        // Remove event listener when Dropdown component is removed from DOM d removal can also be done using if(ref.current && ref.current.contains())
        // return () => {
        //     document.body.removeEventListener('click', onBodyClick)
        // };
    },[]);

    /** we loop options & return a div of each option. If d value of d currently iterated option equals
     *  value of selected option then we do not want to return an option div for that
    **/
    const renderedOptions = options.map( option => {
        if (option.value === selected.value) {
            return null;
        }
        return (
            <div 
                key={option.value} 
                className="item"
                onClick={ () => onSelectedChange(option)}   //onSelectedChange contain setSelected(); a state setter in App
                > {option.label}
            </div>
        );
    });

    return(
        <div ref={ref} className="ui form">
            <div className="field">

                <label className="label">{label}</label>
                <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open} ? 'visible active':''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition':''}`}>
                        {renderedOptions}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dropdown;
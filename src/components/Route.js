import { useEffect, useState } from 'react';

/**windows.location returns and objects with alot of properties that include info of the url we currently visiting
 * in our browser. When this Route compnent is called we recieve path & children as props & used that to decide which
 * component to display. children is receive in Route as a children props
 */

const Route = ({ path, children }) => {
    // This piece of state only exist just to get our route to update once a link is clicked
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    useEffect( () =>{
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);
        // clear the event listener if we decide not to use the Link component
        return () => {
            window.removeEventListener('popsstate', onLocationChange);
        };
    }, [] );
    return currentPath === path ? children : null;
}

export default Route;
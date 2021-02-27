
const Link = ({href, className, children}) => {

     const onClickHandler = (event) =>{
        // Check if Ctrl or CMD key is held down before clicking a link; if that is d case we return so d browber can hadle it
        if (event.metaKey || event.ctrlKey) {
            return;
        }
         event.preventDefault();
        //  Update the URL in the address bar.
         window.history.pushState({}, '', href);

        //  Notifies/send event to ('popsatate') the Route components that the URL just changed
         const navEvent = new PopStateEvent('popstate');
         window.dispatchEvent(navEvent);
     }
    return (<a onClick={onClickHandler} href={href} className={className}>
        {children}
    </a>
    );
}

export default Link;
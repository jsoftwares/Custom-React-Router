import Link from './Link';

const Header = () => {
    return(
        <div className="ui secondary pointing menu">
            <Link href="/" className="item" rel="noopener noreferrer">Accordion</Link>
            <Link href="/list" className="item" >Search</Link>
            <Link href="/dropdown" className="item" rel="noopener noreferrer">Dropdown</Link>
            <Link href="/translate" className="item" rel="noopener noreferrer">Translate</Link>
        </div>
    );
};

export default Header;
function Footer(){
    return(
        <footer className="bg-light text-center py-3 mt-auto border-top">
            <div className="container">
                <span className="text-muted">&copy; {new Date().getFullYear()} Affiliate++ &mdash; All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
import Copyright from "../../assets/icons/copyright.svg";

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="about-info">
                    <p className='footer-content'>Bookish Bar 2024</p>
                    <img src={Copyright} id='copyright-icon' alt='copyright-icon'/>
                    <p>created by Inge Los</p>
                </div>
                <p>All book data is from Open Library API, go to their website <a href="https://openlibrary.org" className='library-link' target='_blank'>here</a></p>
            </div>
        </footer>
    )
}

export default Footer;
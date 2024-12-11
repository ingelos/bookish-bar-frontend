import "./NotFound.css";
import {Link} from "react-router-dom";

function NotFound() {

    return (
        <section className="notfound-section outer-container">
            <div className="notfound-section inner-container">
                <div className="inner-content-container">
                <div className="not-found-container">
                    <h2>404</h2>
                    <p>We can&apos;t find the page you&apos;re looking for</p>
                    <p>Take me back to <Link to={'/'}><strong>Home</strong></Link></p>
                </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound;
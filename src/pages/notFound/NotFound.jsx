import {Link} from "react-router-dom";

function NotFound() {

    return (
        <section className='notfound-section outer-container'>
            <div className='notfound-section inner-container'>
                <h2>404</h2>
                <h4>We can&apos;t find the page you&apos;re looking for</h4>
                <h4>Take me back to the <Link to={'/'}><strong>Home</strong></Link></h4>
            </div>
        </section>
    )
}

export default NotFound;
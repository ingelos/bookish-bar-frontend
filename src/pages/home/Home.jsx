import "./Home.css";


function Home() {

    return (
        <section className="home-section outer-container">
            <div className="home-section inner-container">
                {/*<div className='"home-section inner-content-container'>*/}
                    <div className="welcome-container">
                        <div className="intro-message">
                            <h2>Welcome to Bookish Bar!</h2>
                            <h2>The bar that serves books...</h2>
                        </div>
                        <div className="dictionary-bookish">
                            <h4><strong>bookish</strong> [ book-ish ]</h4>
                            <h4><em>adjective</em></h4>
                            <h4>1. (of a person or way of life) devoted to reading and studying</h4>
                        </div>
                    </div>
                    <div className="trending-container">
                        <div className="preview-container">
                            <h2 className="list-title">Trending today</h2>
                        </div>
                    </div>
                {/*</div>*/}
            </div>
        </section>
    )
}

export default Home;
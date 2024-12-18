import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext.jsx";

function Account() {
    const { user } = useContext(AuthContext);

    return (
        <section className="account-page outer-container">
            <div className="account-page inner-container">
                <div className="account inner-content-container">
                    <h2 className="account-title titles">Account</h2>
                    <div className="account-container">
                        <div>
                            <p>Username: </p>
                            <p>Email: </p>
                        </div>
                        <div>
                            <h3>Edit Account Details</h3>
                            <Link to={`/users/${user.username}/edit`}>Edit Account Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Account;
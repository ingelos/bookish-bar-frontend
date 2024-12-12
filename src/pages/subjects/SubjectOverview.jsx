import "./SubjectOverview.css";
import {Link} from "react-router-dom";


const SubjectOverview = () => {
    const subjects = ["architecture", "art history", "dance", "design", "fashion", "film",
        "graphic design", "music", "painting", "photography", "fantasy", "historical fiction",
        "horror", "humor", "literature", "magic", "mystery and detective stories"];

    return (
        <section className="subjects-page outer-container">
            <div className="subjects-page inner-container">
                <div className="subjects inner-content-container">
                    <h2 className="subjects-title titles">Subject Overview</h2>
                    <div className="subject-container">
                    <ul>
                        {subjects.map((subject) => (
                            <li className="subject-item" key={subject}>
                                <Link to={`/subjects/${subject}`} className="subject-link">
                                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubjectOverview;
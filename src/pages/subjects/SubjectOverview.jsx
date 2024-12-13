import "./SubjectOverview.css";
import categorizedSubjects from "../../helpers/subjectList.js";
import NavigationLink from "../../components/navigationLink/NavigationLink.jsx";

const SubjectOverview = () => {

    return (
        <section className="subjects-page outer-container">
            <div className="subjects-page inner-container">
                <div className="subjects inner-content-container">
                    <h2 className="subjects-title titles">Subject Overview</h2>
                    <div className="subject-container">
                        {Object.entries(categorizedSubjects).map(([category, subjects]) => (
                            <div key={category} className="category">
                                <h2 className="category-title">{category}</h2>
                                <ul className="browse-subjects-list">
                                    {subjects.map((subject) => (
                                        <NavigationLink key={subject}
                                                        navToPage={`/subjects/${subject.replace(/\s+/g, "_")}`}
                                                        navTitle={subject.charAt(0).toUpperCase() + subject.slice(1)}
                                                        customClass="subject-link"
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubjectOverview;
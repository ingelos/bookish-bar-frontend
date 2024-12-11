import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchSubjects() {
            setError(null);
            setLoading(true);

            try{
                const {data} = await axios.get(`https://openlibrary.org/subjects.json`);
                setSubjects(data);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error("Error fetching subjects:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSubjects();
    }, []);

    return (
        <section className="subjects-page outer-container">
            <div className="subjects-page inner-container">
                <div className="subjects inner-content-container">
                    <h2 className="subjects-title titles">All Subjects</h2>
                    {error && <p>Error...</p>}
                    {loading && <p>Loading...</p>}
                    <div className="subject-container">
                        {subjects?.map((subject) => (
                            <div className="subject-container" key={subject.key}>
                                <h3><Link to={"/subjects/:subjectName"}>{subject.title}</Link></h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subjects;
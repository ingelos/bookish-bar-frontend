import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Subject() {
    const {subject} = useParams();
    const [books, setBooks] = useState([]);
    const [works, setWorks] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function fetchSubject() {
            setError(false);
            setLoading(true);
            try {

                const {data} = await axios.get(`https://openlibrary.org/subjects/${subject}.json`, {
                });
                console.log(data);
                console.log(data.works);
                setBooks(data.works);
                setWorks(data.work_count);

            } catch (error) {
                if (axios.isCancel(error)) return;
                    console.error(error);
                    setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchSubject();

    }, [subject]);


    return (
        <section className="subject-page outer-container">
            <div className="subject-page inner-container">
                <div className="subject inner-content-container">
                    <h2 className="subject-title titles">{subject.title}</h2>
                    {error && <p>Error...</p>}
                    {loading && <p>Loading...</p>}
                    <div className="subject-container">
                        <div>
                            {subject && <p>Total works: {works}</p>}
                        </div>
                        {books.length > 0 && (
                            books.map((book) => (
                                <div className="subject-container" key={book.key}>
                                    <h3><Link to={"/books/:bookId"}>{book.title}</Link></h3>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subject;
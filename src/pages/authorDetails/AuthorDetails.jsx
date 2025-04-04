import "./AuthorDetails.css";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import AuthorCard from "../../components/authorCard/AuthorCard.jsx";

function AuthorDetails() {
    const [author, setAuthor] = useState({});
    const [authorWorks, setAuthorWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {authorId} = useParams();

    useEffect(() => {
        const controller = new AbortController();

        async function getAuthorDetails() {
            setError(null);
            setLoading(true);

            try {
                const {data} = await axios.get(`https://openlibrary.org/authors/${authorId}.json`, {
                    signal: controller.signal,
                })
                console.log(data);
                setAuthor(data);
                console.log("authorId ", authorId);
                try {
                    const worksResponse = await axios.get(`https://openlibrary.org/authors/${authorId}/works.json?offset=20`, {
                        signal: controller.signal,
                        });
                        console.log("Author works: ", worksResponse.data.entries);
                        const filteredWorks = worksResponse.data.entries.filter(
                            (work) => work.authors && work.authors.length === 1 && work.authors[0].author.key === `/authors/${authorId}`);
                        setAuthorWorks(filteredWorks);
                    } catch (worksError) {
                            console.error("Error fetching works:", worksError);
                            setError(worksError);
                        }
            } catch (authorError) {
                if (!axios.isCancel(authorError)) {
                    console.error("Error fetching author details", authorError);
                    setError(authorError);
                }
            } finally {
                setLoading(false);
            }
        }

        getAuthorDetails();

        return function cleanup() {
            controller.abort();
        }

    }, [authorId]);

    return (
        <section className="author-page outer-container">
            <div className="author-page inner-container">
                {loading && <p>Loading...</p>}
                {error && <p>{error.message}</p>}
                <div className="author-container">
                    {Object.keys(author).length > 0 &&
                        <AuthorCard
                            name={author.name}
                            bio={author.bio?.value || author.bio}
                            birth_date={author.birth_date}
                            death_date={author.death_date}
                            photo={author.photos && author.photos.length > 0 ? `https://covers.openlibrary.org/b/id/${author.photos[0]}-M.jpg` : ""}
                            links={author.links ? author.links[0].url : ""}
                        />
                    }
                </div>
                <div>
                    {authorWorks.length > 0 && (
                        <div className="author-works-container">
                            <h2>Works by {author.name}</h2>
                            <ul>
                                {authorWorks.map((work) => (
                                <li className="author-works-list" key={work.key}>
                                    <p>{work.title}</p>
                                </li>
                                ))}
                            </ul>
                        </div>
                        )}
                </div>
            </div>
        </section>
    )
}

export default AuthorDetails;
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import TrashIcon from "../../assets/icons/trash.svg";
import Pagination from "../../components/pagination/Pagination.jsx";
import BookCard from "../../components/bookCard/BookCard.jsx";
import Rating from "../../components/rating/Rating.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function MyBooks() {
    const [activeList, setActiveList] = useState("ALL");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchBooks(listType) {
        setLoading(true);
        try {
            const {data} = await axios.get(`http://localhost:8080/bookLists/${listType}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(data.books);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks(activeList);
    }, [activeList]);

    // async function handleAddBook(bookId, listType) {
    //     try {
    //         const { data } = await axios.post(
    //             `http://localhost:8080/lists/${listType}/books/${bookId}`, {},
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         console.log("Book added:", data);
    //     } catch(error) {
    //         console.error("Error adding book:", error);
    //     }
    // }
    // const [myBooks, setMyBooks] = useState([]);
    // const [filter, setFilter] = useState('all');
    // const [currentPage, setCurrentPage] = useState(1);
    // // const {user} = useContext(AuthContext);
    //
    // useEffect(() => {
    //     const storedBooks = JSON.parse(localStorage.getItem('mybooks')) || [];
    //     setMyBooks(storedBooks);
    //     console.log(storedBooks);
    // }, []);
    //
    //
    // function removeFromMyBooks(bookKey) {
    //     const removedFromMyBooks = myBooks.filter((book) => book.key !== bookKey);
    //     setMyBooks(removedFromMyBooks);
    //     localStorage.setItem('mybooks', JSON.stringify(removedFromMyBooks));
    // }
    //
    // function editReadStatus(bookKey, newStatus) {
    //     const updatedBooks = myBooks.map((book) => {
    //         if (book.key === bookKey) {
    //             return {
    //                 ...book,
    //                 status: newStatus,
    //             };
    //         }
    //         return book;
    //     });
    //     setMyBooks(updatedBooks);
    //     console.log(updatedBooks)
    //     localStorage.setItem('mybooks', JSON.stringify(updatedBooks));
    // }
    //
    // function filterBooks(books) {
    //     if (filter === 'wantToRead') {
    //         return books.filter(book => book.status === 'wantToRead');
    //     } else if (filter === 'read') {
    //         return  books.filter(book => book.status === 'read');
    //     }
    //     return books;
    // }
    //
    // const booksPerPage = 20;
    // const indexOfLastBook = currentPage * booksPerPage;
    // const indexOfFirstBook = indexOfLastBook - booksPerPage;
    // const currentBooks = filterBooks(myBooks).slice(indexOfFirstBook, indexOfLastBook);
    //
    // const totalPages = Math.ceil(filterBooks(myBooks).length / booksPerPage);
    //
    // const onPageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // }

    return (
        <section className="mybooks_section outer-container">
            <div className="mybooks-section inner-container">
                {/*<OwnerAccessCheck>*/}
                <div className="result-container">
                    <div className="list-type">
                        <button onClick={() => setActiveList("ALL")}>All</button>
                        <button onClick={() => setActiveList("READ")}>All</button>
                        <button onClick={() => setActiveList("WANT_TO_READ")}>All</button>
                    </div>
                    <div>
                    {loading && <p>Loading...</p>}
                    {!loading && books.length === 0 && <p>No books in this list yet.</p>}
                    {!loading &&
                        books.map((book) => (
                            <BookCard key={book.openLibraryId} {...book} />
                        ))}
                    </div>
                </div>
                {/*</OwnerAccessCheck>*/}
            </div>
        </section>

    )
}

export default MyBooks;
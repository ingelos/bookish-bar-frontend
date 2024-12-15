import "./Pagination.css";
import Button from "../button/Button.jsx";

function Pagination({ totalPages, currentPage, onPageChange}) {

    function handlePageChange(e, pageNumber) {
        e.preventDefault();
        if(pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    }

    return(
        <div className="pagination-container">
            <Button onClick={(e) => handlePageChange(e, currentPage - 1)}
                    className="button pagination-button"
                    disabled={currentPage === 1}
                    buttonText="Previous"
                    buttonType="button"
                    />
            <span className="page-settings">{`Page ${currentPage} of ${totalPages}`}</span>
            <Button onClick={(e) => handlePageChange(e, currentPage + 1)}
                    className="button pagination-button"
                    disabled={currentPage === totalPages}
                    buttonText="Next"
                    buttonType="button"
            />
        </div>
    )
}

export default Pagination;
import "./AuthorCard.css";
import NoAuthorPhoto from "../../assets/icons/No_image_available.svg.png";

function AuthorCard({ name, bio, photo, birth_date, death_date, links}) {

    function onPhotoError(e) {
        e.target.src = NoAuthorPhoto;
    }

    return (
        <div className="author-detail-container">
                <div className="author-img-container">
                    <img src={photo || ""}
                         alt={`photo of ${name}`}
                         onError={onPhotoError}
                         className="author-img"
                    />
                </div>
            <div className="author-detailed-info">
                <h2>{name}</h2>
                <p className="bio-author">{bio ? bio : ""}</p>
                <p className="date-link">{(birth_date ? `Date of birth: ${birth_date}` : '')} {death_date ? `- Date of death: ${death_date}` : ''}</p>
                <p className="author-link">{links || ""}</p>
            </div>
        </div>
    )
}

export default AuthorCard;
import { useOutletContext, useParams } from "react-router-dom";

function Content() {
    const { noteId } = useParams();
    // useOutletContext returns [notes]
    // const [notes] = [notes]

    const [notes] = useOutletContext();
    return (
        <>
            {notes.length > 0 && notes[noteId] ? (
                <div>
                    <h2 id="cont-title">{notes[noteId].title}</h2>
                    <h6 id="cont-time">{notes[noteId].when}</h6>
                    <p id="cont-body">{notes[noteId].body}</p>
                </div>
            ): (
                <p>Select a notes, or create a new one</p>
            )}
        </>
    );
}

export default Content;
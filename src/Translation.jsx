/* eslint-disable react/prop-types */
function Translation(props) {

    const text = `"${props.data.english}" translates to "${props.data.german}"`

    function handleHighlight() {
        props.handleHighlight()
    }

    function handleDelete() {
        props.handleDelete()
    }

    const tanslationClassNames = "translation " + (props.data.highlighted ? "highlighted" : "")
    
    return (
        <div className={tanslationClassNames}>
            <div className="translation-text">
                {text}
            </div>
            <div className="icons">
                <i onClick={handleHighlight} className="fa-solid fa-lightbulb"></i>
                <i onClick={handleDelete} className="fa-solid fa-trash"></i>
            </div>
        </div>
    );
}

export default Translation;
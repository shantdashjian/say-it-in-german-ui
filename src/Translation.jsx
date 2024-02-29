/* eslint-disable react/prop-types */
function Translation(props) {
    const text = `"${props.data.english}" translates to "${props.data.german}"`

    function handleHighlight() {
        props.handleHighlight()
    }

    function handleDelete(e) {
        e.stopPropagation()
        props.handleDelete()
    }

    const tanslationClassNames = "translation " + (props.data.highlighted ? "highlighted" : "")
    
    return (
        <div className={tanslationClassNames} onClick={handleHighlight}>
            <div className="translation-text">
                {text}
            </div>
            <div className="icons">
                <div className="delete-btn" onClick={(e) => handleDelete(e)}></div>
            </div>
        </div>
    );
}

export default Translation;
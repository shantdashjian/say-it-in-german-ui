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
                <i onClick={(e) => handleDelete(e)} className="fa-solid fa-trash"></i>
            </div>
        </div>
    );
}

export default Translation;
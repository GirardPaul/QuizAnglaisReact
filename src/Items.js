function Items(props){
    return (
        <div className="mt-3 mb-3">
            <h2>{props.data.nameFrench}</h2>

            <select className="form-control" id={props.data.nameFrench} onChange={(e) => props.handleChange(props.data.word1, props.data.nameFrench, e)} aria-label="Selectionner un élément">
                <option selected>Sélectionner une réponse</option>
                <option value={props.data.word1}>{props.data.word1}</option>
                <option value={props.data.word2}>{props.data.word2}</option>
                <option value={props.data.word3}>{props.data.word3}</option>
            </select>

        </div>
    )
};

export default Items;
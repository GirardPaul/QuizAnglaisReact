import Items from "./Items";

function List(props){

    const handleChange = (value, wordFrench, e) => {
        props.setDataToParents(value, wordFrench, e);
    }

    if(Object.keys(props.data).length !== 0){
        return (
              <div>{props.data.words.map((items, key) => (
                  <Items handleChange={handleChange} index={key} data={items} />
              ))}</div>
        )
    } else {
        return (
            <p>Loading....</p>
        )
    }
};

export default List;


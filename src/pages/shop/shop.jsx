import React from "react";
import SHOP_DATA from './shop.data.js';
import CollectionPreview from "../../components/collection-preview/collection-preview.jsx";

class ShoPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render(){
        const {collections} = this.state;
        return(
            <div className="shop-page">
                {
                    collections.map(({id, ...othersProps}) => (
                        <CollectionPreview key={id} {...othersProps} />
                    ))
                }
            </div>
        );
    }
}

export default ShoPage;
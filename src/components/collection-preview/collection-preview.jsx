import React from "react";
import './collection-preview.scss';
import CollectionItem from "../collection-item/collection-item";

const CollectionPreview = ({title, items}) => (
    <div className="collection-preview">
        <span className="title">{title.toUpperCase()}</span>
        <div className="preview">
            {items
                .filter((item, idx) => idx < 4)
                .map(({id, ...otherItems}) =>(
                    <CollectionItem key={id} {...otherItems} />
                ))
            }
        </div>
    </div>
)

export default CollectionPreview;
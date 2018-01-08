import React, { Component } from 'react';
import '../Section.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        const { item,key } = this.props;
        return (
            <div className="item" key={key}>
                {item.name}
            </div>
        );
    };
};

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas:[]
        };
    };

    render() {
        const { items,initialSectionId } = this.props;
        return (
            <div className="items">
                { items.map((item,index) =>(
                    <Item item={item} initialSectionId={initialSectionId} key={index}/>
                  ))
                }
            </div>
        );
    };
};

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section:props.section,
            key:props.key
        };

    };



    render() {
        const { section,key } = this.state;
        return (
            <div className="section-container">
                <div className="row header_section">
                    <div className="title">
                        {section.name} ({section.items.length})
                    </div>
                </div>
                <div className="row content_section" key={key}>
                    <Items items={section.items} initialSectionId={section.id}/>
                </div>
            </div>
        );
    };
};

export default Section;

import React, { Component } from 'react';
import '../Section.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    drag = (ev,itemDatas,initialSectionId) => {
        ev.dataTransfer.dropEffect = "move";
        ev.dataTransfer.setData("text/plain", JSON.stringify({itemDatas,initialSectionId,isItem:true}));
    }

    render() {
        const { item,key,initialSectionId } = this.props;
        return (
            <div className="item" key={key} draggable="true" onDragStart={(e) => this.drag(e,item,initialSectionId)}>
                {item.name}
            </div>
        );
    }
};

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas:[]
        }
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
            sock:props.sock,
            key:props.key
        };

        this.drop = this.drop.bind(this);
    }

    drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        let _data = JSON.parse(data);
        _data['newSectionId'] = this.props.section.id;
        this.props.sock.send(JSON.stringify(_data));
    };

    allowDrop = (ev) => {
        ev.preventDefault();
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
                <div className="row content_section" key={key} onDrop={this.drop} onDragOver={this.allowDrop}>
                    <Items items={section.items} initialSectionId={section.id}/>
                </div>
            </div>
        );
    }
};

export default Section;

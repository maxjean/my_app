import React, { Component } from 'react';
import Section from './Section';

class Board extends Component {
    constructor(props){
        super(props);
        let self = this;
        this.state = {
            sections_datas:[],
            loading:true
        };

        const sock = new WebSocket('ws://127.0.0.1:4247');

        sock.onopen = function() {
            console.log('open');
        };

        sock.onmessage = function(e) {
            var data = JSON.parse(e.data);
            let { sections_datas } = self.state;
            if(data && data.isItem) {
                let oldIndex = sections_datas.findIndex(function(x){return x.id===data.initialSectionId});
                let index = sections_datas.findIndex(function(x){return x.id===data.newSectionId});
                sections_datas[oldIndex].items = sections_datas[oldIndex].items.filter(el => el.id !== data.itemDatas.id);
                sections_datas[index].items = [...sections_datas[index].items,data.itemDatas];
                self.setState({sections_datas});
            };
        };

        sock.onclose = function() {
            console.log('close');
        };

        this.state.sock = sock;
    }

    componentDidMount(){
        fetch('http://127.0.0.1:4246/sectionsDatas').then(results =>{
            return results.json();
        }).then(datas =>{
            this.setState({sections_datas:datas,loading:false});
        }).catch(e=>{
            this.setState({loading:false});
        });
    };

    render() {
        const { sections_datas, sock } = this.state;
        let content;

        if (this.state.loading) {
            content = <div>Chargement des données...</div>;
        } else {
            content = sections_datas.map((section,index) =>(
                <div className="sections-container">
                    <Section section={section} sock={sock} key={index}/>
                </div>
            ));
        };

        return (
            <div className="Sections">
                {content}
            </div>
        );
    };
};

export default Board;

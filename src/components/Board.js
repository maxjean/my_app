import React, { Component } from 'react';
import Section from './Section';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            sections_datas:[],
            loading:true
        };
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
        const { sections_datas } = this.state;
        let content;

        if (this.state.loading) {
            content = <div>Chargement des données...</div>;
        } else {
            content = sections_datas.map((section,index) =>(
                <div className="sections-container">
                    <Section section={section} key={index}/>
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

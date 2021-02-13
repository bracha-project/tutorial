import React, { Component } from 'react';
import './App.css';


export default class AppDragDropDemo extends Component {
    state = {
        imgs: [
            {name: "demo", src: require("./assets/img.jpg"), category: "warp", class: "draggable"}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);


        // const el = document.getElementById('drag');
        // el.classList.add("rotate");

        // ev
        // .dataTransfer
        // .setData('text/plain', ev.target.id);
        
       
        // ev
        // .currentTarget
        // .style
        // .transform = 'rotate(30deg)';

        // ev.dataTransfer.setData("class", "rotate");

   

        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        
        ev.preventDefault();

    }

    onDragTest = (ev) => {

        // const el = document.getElementById('drag');
        // el.classList.add("rotate");

        // ev
        // .dataTransfer
        // .setData('text/plain', ev.target.id);
       
        // ev
        // .currentTarget
        // .style
        // .transform = 'rotate(30deg)';

        ev
        .currentTarget
        .style
        .display = 'none';
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let imgs = this.state.imgs.filter((task) => {
           if (task.name === id) {
               task.category = 'complete';
           }
           return task;
       });

       this.setState({
           ...this.state,
           imgs
       });
    }

    render() {
        var imgs = {
            warp: [],
            complete: []
        }

        this.state.imgs.forEach ((t) => {
            imgs[t.category].push(
                <img key={t.name} 
                    src={t.src}
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable={true}
                    onDrag={(e) => this.onDragTest(e)}
                    className={t.class}
                    alt={t.name}
                    id="drag"
                />
            );
        });

        return (
            <div className="container-drag">
                <div className="warp"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "warp")}}>
                    <span className="task-header">Drag the image</span>
                    {imgs.warp}
                </div>
                {/* <div id="coverup"></div> */}
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">Drag the image here</span>
                     {imgs.complete}
                </div>

            </div>
        );
    }
}
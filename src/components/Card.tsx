import * as React from "react";
import "./Card.scss";

export interface Props {
   readonly image: string;
   readonly name: string;
}

export default class Card extends React.Component<Props> {
   transform: string;

   constructor(props: Props) {
      super(props);
      let angle: number = Math.floor(Math.random() * 35);
      let transformPos: { x: string; y: string } = {
         x: `${Math.floor(Math.random() * 15)}px`,
         y: `${Math.floor(Math.random() * 15)}px`
      };
      this.transform = `translate(${transformPos.x}, ${transformPos.y}) rotate(${angle}deg)`;
   }
   public render() {
      return (
         <div className="Card">
            <img
               style={{ transform: this.transform }}
               src={this.props.image}
               alt={this.props.name}
            ></img>
         </div>
      );
   }
}

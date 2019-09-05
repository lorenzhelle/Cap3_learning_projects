import React from "react";
import axios from "axios";
import CardComp from "./Card";
import "./Deck.scss";

export interface DeckProps {
   readonly title: string;
}

interface State {
   deckID: string;
   drawnCards: Array<Card>;
}

interface deckApi {
   shuffled: boolean;
   success: boolean;
   deck_id: string;
   remaining: number;
}

interface Card {
   code: string;
   image: string;
   suit: string;
   value: string;
}

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

export default class Deck extends React.Component<DeckProps, State> {
   constructor(props: DeckProps) {
      super(props);
      this.state = {
         deckID: "zhz7zhhz",
         drawnCards: []
      };
   }
   async componentDidMount(): Promise<void> {
      let drawnDeck = await axios.get(
         `${API_BASE_URL}new/shuffle/?deck_count=1`
      );
      let data: deckApi = drawnDeck.data;
      this.setState({ deckID: data.deck_id });
   }

   getCard = async (): Promise<void> => {
      try {
         let cardResponse = await axios.get(
            `${API_BASE_URL}${this.state.deckID}/draw/?count=1`
         );
         if (!cardResponse.data.success) {
            throw new Error("No remaining cards to draw");
         }
         let drawnCard: Card = cardResponse.data.cards[0];
         this.setState(st => ({
            drawnCards: [...st.drawnCards, drawnCard]
         }));
      } catch (err) {
         alert(err);
      }
   };

   handleReset = () => {
      this.setState({
         drawnCards: []
      });
   };

   public render() {
      return (
         <div>
            <h1 className="Deck-title">{this.props.title}</h1>
            <button className="Deck-generate" onClick={this.getCard}>
               Generate Card
            </button>
            {this.state.drawnCards.length > 0 && (
               <button className="Deck-reset" onClick={this.handleReset}>
                  Reset Deck
               </button>
            )}
            <div className="Deck-area">
               {this.state.drawnCards.map(card => (
                  <CardComp
                     key={card.code}
                     image={card.image}
                     name={card.suit}
                  />
               ))}
            </div>
         </div>
      );
   }
}

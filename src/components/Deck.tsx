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
   error: boolean;
}

interface DeckApiResult {
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
         drawnCards: [],
         error: false
      };
   }
   async componentDidMount(): Promise<void> {
      const drawnDeck = await axios.get(
         `${API_BASE_URL}new/shuffle/?deck_count=1`
      );
      let data: DeckApiResult = drawnDeck.data;
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
            drawnCards: [...st.drawnCards, drawnCard],
            error: false
         }));
      } catch (err) {
         console.log(err);
         this.setState({
            error: true
         });
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
            <h1 className="deck-title">{this.props.title}</h1>
            <button className="deck-generate" onClick={this.getCard}>
               Generate Card
            </button>
            {this.state.drawnCards.length > 0 && (
               <button className="deck-reset" onClick={this.handleReset}>
                  Reset Deck
               </button>
            )}
            {this.state.error && (
               <h2>Error, Karte konnte nicht gezogen werden</h2>
            )}
            <div className="deck-area">
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

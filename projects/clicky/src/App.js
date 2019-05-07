import React from "react";
import images from "./images.json";
import Wrapper from "./components/Wrapper/Wrapper";
import Header from "./components/Header/Header";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import ImageCard from "./components/ImageCard/ImageCard";
import Footer from "./components/Footer/Footer";

class App extends React.Component {
  state = {
    images: images,
    clickedImages: [],
    highScore: 0,
    score: 0,
    totalClick: 0,
    displayMessage: "How good is your memory?"
  };

  handleShuffle(id) {
    if (!this.state.clickedImages.includes(id)) {
      this.setState({
        score: this.state.score + 1,
        displayMessage:
          this.state.score + 1 === 12
            ? "You won! Play again?"
            : "How good is your memory?",
        clickedImages: [...this.state.clickedImages, id],
        highScore:
          this.state.score + 1 > this.state.highScore
            ? this.state.score + 1
            : this.state.highScore
      });
    } else {
      this.setState({
        score: 0,
        displayMessage: "Bummer! You lost. Try again?",
        clickedImages: []
      });
    }
    this.setState({
      images: images.sort(() => Math.random() - 0.5),
      totalClick: this.state.totalClick + 1
    });
  }

  render() {
    return (
      <>
        <Header
          score={this.state.score}
          highScore={this.state.highScore}
          msg={this.state.displayMessage}
        />
        <Jumbotron />
        <Wrapper>
          {this.state.images.map(i => (
            <ImageCard
              key={i.id}
              name={i.name}
              image={i.image}
              clickHandler={() => this.handleShuffle(i.id)}
            />
          ))}
        </Wrapper>
        <Footer />
      </>
    );
  }
}

export default App;

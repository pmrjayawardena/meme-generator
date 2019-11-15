import React from "react";

class MemeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "https://i.imgflip.com/1bip.jpg",
      allMemeImg: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        console.log(memes[0]);
        this.setState({
          allMemeImg: memes
        });
      });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleChangeImage(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImg.length);
    const randMeme = this.state.allMemeImg[randNum].url;
    this.setState({
      randomImage: randMeme
    });
  }
  render() {
    return (
      <div>
        <p>Meme Generator Section</p>
        <h1>{this.state.topText}</h1>
        <img src={this.state.randomImage} alt="img" />
        <h1>{this.state.bottomText}</h1>

        <form>
          <label>Top Text</label>
          <input
            type="text"
            name="topText"
            onChange={this.handleChange}
            value={this.state.topText}
          />
          <label>Bottom Text</label>
          <input
            type="text"
            name="bottomText"
            onChange={this.handleChange}
            value={this.state.bottomText}
          />

          <button onClick={this.handleChangeImage}>Generate</button>
        </form>
      </div>
    );
  }
}

export default MemeGenerator;

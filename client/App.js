import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, TextInput} from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  constructor() {
  super();
  // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    joke: "",
    gif: "",
    inputValue: "",
    vote_up: 0,
    _id: ""
  };
  // this._handleDownVote = this._handleDownVote.bind(this)
}

  componentDidMount(){
    fetch("https://dad-o-myte.herokuapp.com/jokes")
    .then(res => res.json())
    .then(jokes => {
      let joke = jokes[Math.floor(Math.random()*jokes.length)]
      this.setState({_id: joke._id, joke: joke.joke, vote_up: joke.vote_up})
      console.log(this.state)
    })
    
    fetch("http://api.giphy.com/v1/gifs/search?q=laughing&api_key=dc6zaTOxFJmzC")
    .then(res =>res.json())
    .then(gifs => {
      let data = gifs.data;
      let newGif = data[Math.floor(Math.random() * data.length)]
      this.setState({gif: newGif.images.fixed_height_small.url})
    })
  }



  _handleButtonPress = () => {
    fetch("https://dad-o-myte.herokuapp.com/jokes")
    .then(res => res.json())
    .then(jokes => {
      let joke = jokes[Math.floor(Math.random()*jokes.length)]
      this.setState({_id: joke._id, joke: joke.joke, vote_up: joke.vote_up})
      console.log(this.state)
    })
    
    fetch("http://api.giphy.com/v1/gifs/search?q=laughing&api_key=dc6zaTOxFJmzC")
    .then(res =>res.json())
    .then(gifs => {
      let data = gifs.data;
      let newGif = data[Math.floor(Math.random() * data.length)]
      this.setState({gif: newGif.images.fixed_height_small.url})
      console.log(this.state)
    })
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleSubmitForm = () => {
    return fetch("https://dad-o-myte.herokuapp.com/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        joke: this.state.inputValue,
        vote_up: 0,
        vote_down: 0
      })
      
    }).then(res => res.json())
    .then(() => {
      this.setState({inputValue: ""})
    })
  };

 
  _handleUpVote = () => {
    let id = this.state._id
    return fetch(`https://dad-o-myte.herokuapp.com/jokes/${id}/vote_up`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((joke) => {
      this.setState({vote_up: joke.vote_up })
      console.log("djdjdjj");
    })
    .catch((err) => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Dad O Myte!</Text>
        
        <TextInput
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          style={{ width: 200, height: 44, padding: 8 }}
        />
        <Text>{this.state.joke}</Text>
        <Image
          source={{ uri: this.state.gif }}
          style={{ height: 200, width: 200 }}
        />
    
        <Button
          title="next"
          onPress={this._handleButtonPress}
        />
        
      
        <Button
          title="submit"
          onPress={this._handleSubmitForm}
        />
       {/*
         <TouchableHighlight onPress={this._handleUpVote}>
        <Image
          // style={styles.button}
          source={('https://www.gerberlife.com/sites/all/themes/custom/gerber/img/icon-thumbs-up.png')}
         />
      </TouchableHighlight>
       
       */} 
    
        <Text>{this.state.vote_up}</Text>
        <Button
          title="^"
          onPress={this._handleUpVote}
        />
      
      
    
      {/*  
        <Text style={styles.heading}>Add a New Song</Text>
        
       */}  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  // item: {
  //   marginTop: 10
  // },
  // heading: {
  //   fontSize: 28,
  //   fontWeight: 'bold'
  // }
});
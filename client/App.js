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
    vote_up: ""
  };
  this._handleUpVote = this._handleUpVote.bind(this)
  // this._handleDownVote = this._handleDownVote.bind(this)
}

  componentDidMount(){
    fetch("https://dad-o-myte.herokuapp.com/jokes")
    .then(res => res.json())
    .then(jokes => {
      let joke = jokes[Math.floor(Math.random()*jokes.length)]
      this.setState({joke: joke.joke, vote_up: joke.vote_up})
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
      this.setState({joke: joke.joke})
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
    // .then(res => res.json())
    // .then(savedSong => {
    //   let songsUpdated = [...this.state.songs._dataBlob.s1, savedSong];
    //   this.setState({
    //     songs : this.state.songs.cloneWithRows(songsUpdated)
    //   })
    // })
  };

  // _handleDelete = (_id) => {
  //   console.log(_id)

  //   return fetch(`https://morning-mesa-23625.herokuapp.com/songs/${_id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then(oldSongId => {
  //     let songsUpdated = this.state.songs._dataBlob.s1.filter((song, i) => song._id !== oldSongId)
  //     console.log('deleted id ', oldSongId)
  //     this.setState({
  //       songs : this.state.songs.cloneWithRows(songsUpdated)
  //     });
  //   })
  // };

  // /*
  // function _handleVote(_id, direction) {

  // }
  // */
  _handleUpVote = () => {
    return fetch("https://dad-o-myte.herokuapp.com/${_id}/vote_up", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
        <TextInput
          style={{ width: 200, height: 44, padding: 8 }}
          defaultValue="artist"
          onChangeText={(text) => this.setState({artist: text})}
        />
        
        <TextInput
          style={{ width: 200, height: 44, padding: 8 }}
          defaultValue="song"
          onChangeText={(text) => this.setState({song: text})}
        />
        
        <Button
          title="Add Song"
          onPress={this._handleButtonPress}
        />
    
      <ListView
        dataSource={this.state.songs}
        renderRow={(song) => 
        <View style={styles.container}>
        
        <Text style={styles.item}>Artist: {song.artist} | Song: {song.songName} | Votes: {song.votes}</Text>
        
        <Button
          title="Press me"
          onPress={this._handleButtonPress}
        />
      
       
        
        </View>}
      />*/}  
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
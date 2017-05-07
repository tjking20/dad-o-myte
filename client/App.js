import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, TextInput} from 'react-native';
import { Constants } from 'expo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Display from 'react-native-display';


export default class App extends Component {
  constructor() {
  super();

  this.state = {
    gestureName: 'none',
    joke: "",
    gif: "",
    inputValue: "",
    enable: true
    // vote_up: 0,
    // _id: "",

  };
}

	onSwipeUp(gestureState) {

	}

	onSwipeDown(gestureState) {

	}

	onSwipeLeft(gestureState) {
    if(this.state.enable == false){
      this._handleToggleDisplay(); 
    } else{
      this._handleButtonPress();
    }
    
	}

	onSwipeRight(gestureState) {

    this._handleToggleDisplay();
		
	}

	onSwipe(gestureName, gestureState) {
		const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		this.setState({gestureName: gestureName});
		switch (gestureName) {
			case SWIPE_UP:

				break;
			case SWIPE_DOWN:

				break;
			case SWIPE_LEFT:

				break;
			case SWIPE_RIGHT:

				break;
		}
	}

  //mounts a new gif and dad joke
  componentDidMount(){
    //fetch call to the api
    fetch("https://dad-o-myte.herokuapp.com/jokes")
    .then(res => res.json())
    .then(jokes => {
      let joke = jokes[Math.floor(Math.random()*jokes.length)]
      this.setState({joke: joke.joke})
      console.log(this.state)
    });
    
    //fetch call to the giphy api
    fetch("http://api.giphy.com/v1/gifs/search?q=laughing&api_key=dc6zaTOxFJmzC")
    .then(res =>res.json())
    .then(gifs => {
      let data = gifs.data;
      let newGif = data[Math.floor(Math.random() * data.length)]
      this.setState({gif: newGif.images.fixed_height.url})
    })
  }


  //handleButtonPress runs the same code as componentDidMount.
  //allows us to load a new joke
  _handleButtonPress = () => {

    fetch("https://dad-o-myte.herokuapp.com/jokes")
    .then(res => res.json())
    .then(jokes => {
      let joke = jokes[Math.floor(Math.random()*jokes.length)];
      this.setState({joke: joke.joke});
      console.log(this.state)
    });
    
    fetch("http://api.giphy.com/v1/gifs/search?q=laughing&api_key=dc6zaTOxFJmzC")
    .then(res =>res.json())
    .then(gifs => {
      let data = gifs.data;
      let newGif = data[Math.floor(Math.random() * data.length)];
      this.setState({gif: newGif.images.fixed_height.url});
      console.log(this.state)
    })
  };

  _handleToggleDisplay = () => {
    // let toggle = !this.state.enable;
    // this.setState({enable: toggle});
    if(this.state.enable == true){
      this.setState({enable: false});
    } else{
      this.setState({enable: true})
    }
  };

  //TIM YOU MAY NEED TO MOVE THIS
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

 
  // _handleUpVote = () => {
  //   let id = this.state._id;
  //   return fetch(`https://dad-o-myte.herokuapp.com/jokes/${id}/vote_up`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then((joke) => {
  //     this.setState({vote_up: joke.vote_up });
  //     console.log("djdjdjj");
  //   })
  //   .catch((err) => console.log(err));
  // };

  render() {
	  const config = {
		  velocityThreshold: 0.3,
		  directionalOffsetThreshold: 80
	  };
    return (
      <View style={styles.container}>
        <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeUp={(state) => this.onSwipeUp(state)}
            onSwipeDown={(state) => this.onSwipeDown(state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
        >
        <View style={styles.header}>
          <Text style={styles.h1}>Dad O Myte!</Text>
        </View>
        
        
        <Display 
            enable={this.state.enable} 
            enterDuration={500} 
            exitDuration={250}
            exit="fadeOutRight"
            enter="fadeInRight"
        >

          <Text style={styles.paragraph}>{this.state.joke}</Text>

          <Image
            source={{ uri: this.state.gif }}
            style={styles.image}
          />
        </Display>
        <Display 
            enable={!this.state.enable} 
            enterDuration={500} 
            exitDuration={250}
            exit="fadeOutLeft"
            enter="fadeInLeft"
        >
          <TextInput
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            style={styles.formView}
          />
        

          <Button title="Add your own! =>" onPress={this._handleSubmitForm} color='white'/>
          <View style={styles.push}></View>

        </Display>

        </GestureRecognizer>
      </View>
    );


  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#4BDB70',
  }, h1: {
    flex: 2,
    fontSize: 30,
    color: '#DD8690',
    textShadowColor: 'white',
    // textAlign: 'center',
    letterSpacing: 5,
    fontWeight: 'bold',
  },paragraph: {
    padding: 30,
    backgroundColor: '#4BDB70',
    flex: 3,
    maxHeight: 250,
    fontSize: 22,
    textAlign: 'center',
    width: 330,
    color: "white",
    borderWidth: 1,
    borderColor: '#ffff66',
  },image: {
    flex: 5,
    height: 400,
    width: 330,
    // height: 200,
    // width: 200,
    backgroundColor: '#34495e',
    alignSelf: 'center',
    marginBottom: 100,
  }, header:{
    paddingTop: 30,
    height: 64,
    backgroundColor: '#6D6C6B',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDDDDD',
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row', // step 1
    width: 330, 
  }, formView: {
    textAlign: 'center',
    alignSelf: 'center',
    width: 320,
    height: 250,
    fontSize: 22,
    backgroundColor: '#CBCBCB',
    borderWidth: 1,
    borderColor: '#ffff66',
    color: "white",
  }, input: {
    padding:10, 
    height:45, 
    overflow:'hidden', 
    borderRadius:4, 
    backgroundColor: 'white'
  }, p: {
    margin: 40,
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationStyle: "solid",
    textDecorationColor: 'white',
    textDecorationLine: 'underline'
  }, push:{
    height: 300,
  }
});
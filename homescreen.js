import { StatusBar } from 'expo-status-bar';
import { render } from 'react-dom';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  };

  getWord = (word)=>
    {
      var searchKeyword=word.toLowerCase();
      var url= "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"+searchKeyword+".json";
      return fetch(url)
      .then((data)=>{
          if(data.status===200){
              return data.json()
          }else{
              return null
          }
      })
      .then((response)=>{
          var responseObject = response
          if(responseObject)
          {
              var wordData = responseObject.definitions[0]

              var definition=wordData.description
              var lexicalCategory=wordData.wordType

              this.setState({"word":this.state.text, "lexicalCategory":lexicalCategory, "definition":definition,"lexocalCategory":lexicalCategory})
          }else{
              this.setState({"word":this.state.text,"definition":"Not Found"})
          }
      })
    }
      render(){
  return (
    <View style={styles.container}>
      <TextInput
          onChangeText={(text) => {
            this.setState({
              text: text,
              word:'loading...',
              lexicalCategory: '',
              examples: [],
              definition:"",
            });
          }} value={this.state.text} style={styles.inputBox}
        />


        <TouchableOpacity onPress={() => {
          this.setState({isSearchPressed:true})
          this.getWord(this.state.text)
        }} style={styles.goButton}>
          <Text style={styles.buttonText}>Searc</Text>
        </TouchableOpacity>
        <Text style={styles.displayText}>{this.state.displayText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
}


  

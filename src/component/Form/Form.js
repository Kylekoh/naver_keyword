import React, { Component } from 'react';
import axios from 'axios';
import KeywordList from '../KeywordList'

const crypto = require('crypto');
// import personal information from .env file.
// const {
//   API_KEY: api_key,
//   CLIENT_KEY: client_key,
//   CLIENT_NUM: client_num
// } = process.env;
const api_key = '0100000000509c9d1f7ee362d1adb639983214131b17cfc07768c57afee2951afcf4530215'
const client_key = 'AQAAAACMi/RyVIV+oKKb3B555Pcc56lxF8yI0Y5NQ8WClK3j8A=='
const client_num = '1295182'

const time_stamp = new Date().getTime();

class Form extends Component {
  constructor() {
    super();
    this.generateHMAC = this.generateHMAC.bind(this);
    this.state = {
      keywordLists: '',
      isLoading: true,
      isError: true,
    }
  }

  generateHMAC = (clientKey) => {
    const method = "GET";
    // 암호화 객체 생성, sha256 알고리즘 선택
    const path = "/keywordstool"
    const hmac = crypto.createHmac('sha256', clientKey);
    const result = hmac.update(time_stamp + "." + method + "." + path).digest('base64');
    
    return result;
  }

  componentDidMount = () => {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.naver.com/keywordstool', {
      headers: {
        'X-API-KEY': api_key,
        'X-Customer': client_num,
        'X-Timestamp': time_stamp,
        'X-Signature': this.generateHMAC(client_key),
        'Content-Type': 'application/json',
      },
      params: {
        "includeHintKeywords" : 0,
        "showDetail" : 1,
        "hintKeywords" : "주식투자",              
      }
    })
    .then((response) => {
      const keywordLists = response.data.keywordList;
      this.setState({ 
        keywordLists, 
        isLoading: false,
      })
    })
    .catch(err => this.setState({ 
      isError: false, 
      isLoading: false 
    }));
  } 

  render() {
    return (
      <div>
        <KeywordList 
          keywordLists={this.state.keywordLists}
          isLoading={this.state.isLoading}
          isError={this.state.isError}
        />
      </div>
    );
  }
}

export default Form;
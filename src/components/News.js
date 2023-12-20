import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super()
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=6f0bf3b1150c40a6b02e18f319d79035&page=1";
        let data = await fetch(url); 
        let parseData = await data.json();
        this.setState({articles:parseData.articles, totalResults:parseData.totalResults})
    }

    handelPreviousClick = async () => {
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=6f0bf3b1150c40a6b02e18f319d79035&page${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url); 
        let parseData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles:parseData.articles
        })
    }

    handelNextClick = async () => {
        if(this.state.page + 1 > Math.ceil(this.state.totalResults / 20)){
    
        }
        else{
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=6f0bf3b1150c40a6b02e18f319d79035&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url); 
        let parseData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles:parseData.articles
        })
    }
    }
  render() {
    return (
        <div className="container my-3">
            <h2>DailyHunt - Top Headlines</h2>
            <div className="row">
            {this.state.articles.map((ele)=>(
                <div className="col-md-4" key={ele.url}>
                <NewsItem title={ele.title?ele.title.slice(0, 40):""} description={ele.description?ele.description.slice(0,80)+"....":""} imageUrl={ele.urlToImage} newsUrl={ele.url}/>
            </div>
            ))}
            </div>
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handelPreviousClick}> &larr; Previous</button>
            <button type="button" className="btn btn-primary" onClick={this.handelNextClick}>Next &rarr; </button>
            </div>
      </div>
    )
  }
}

export default News

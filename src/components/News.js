import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spin from './Spin'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country : "in",
        pageSize : 6,
        category : "general"
        }
    
    static propsType = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }

    handelUpClick = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    constructor(props){
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page:1
        }

        document.title = `${this.handelUpClick(this.props.category)} - DaliyHunt`;
    }

    async updateNews(){
        const url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6f0bf3b1150c40a6b02e18f319d79035&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url); 
        let parseData = await data.json();
        this.setState({articles:parseData.articles, 
            totalResults:parseData.totalResults,
            loading : false
        })
    }

    async componentDidMount(){
        this.updateNews();
    }

    handelPreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
    this.updateNews();
    }

    handelNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
    this.updateNews();
    }
  render() {
    return (
        <div className="container my-3">
            <h1 className='text-center'>DailyHunt - Top Headlines - {this.handelUpClick(this.props.category)}</h1>
            {this.state.loading && <Spin/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((ele)=>(
                <div className="col-md-4" key={ele.url}>
                <NewsItem title={ele.title?ele.title.slice(0, 40):""} description={ele.description?ele.description.slice(0,80)+"....":""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
            </div>
            ))}
            </div>
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handelPreviousClick}> &larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.handelNextClick}>Next &rarr; </button>
            </div>
      </div>
    )
  }
}

export default News

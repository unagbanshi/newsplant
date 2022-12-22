import React, { Component } from 'react'
import Newitems from './Newitems'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }
  // static defaultProps = {
  //   country: PropTypes.string,
  //   pageSize:PropTypes.number,
  //   category: PropTypes.string,
  // }
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
   constructor(props){
   super(props);
   this.state = {
   articles: [],
   loading: false,
    page:1,
    totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
      async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0f93006106b4b50a75fd6c335261038&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data =  await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
        loading: false})

      }
        async componentDidMount(){
          
            this.updateNews();
        }
        
    HandlePrevClick =async ()=>{

this.setState({page: this.state.page - 1});
this.updateNews();
    }
    HandleNextClick =async ()=>{
     console.log("Next");
  
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }
  fetchMoreData = async () => {
   this.setState({page: this.state.page + 1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0f93006106b4b50a75fd6c335261038&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   this.setState({loading: true});
   let data =  await fetch(url);
   let parsedData = await data.json()
   console.log(parsedData); 
   this.setState({articles:this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults,
   loading: false})
  };
  render() {
    return (
      <>
       News By Ujjwal
      <></><div className="container my-1">
        <h1 className='text-center'>NewsMonkey - Top  {this.capitalizeFirstLetter(this.props.category)}headlines</h1>
        {/* {this.state.loading && <Spinner/>}  */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
          </div>
          <div className="row">

            {this.state.articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <Newitems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} auther={element.author} date={element.publishedAt} />
              </div>;
            })}
          </div>
        </InfiniteScroll>

      </div></>
      
    )
  }
}

export default News
import React, { Component } from 'react'

export class Newitems extends Component {
  render() {
   let {title, description , imageUrl, newsUrl, author, date} = this.props;
    return (
     <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageUrl?"https://images.wsj.net/im-631257/social":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}<span class="badge text-bg-success">Success</span></h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small class="text-muted">By {!author?"Unknown": author} on {new Date(date).toDateString()}</small></p>
    <a href={newsUrl} target=" blank" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newitems
import React from 'react';
import Tags from './Tags.jsx';

class Description extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      ratingPercent: (Math.random() / 5) * 100,
      read: false
    }
  }

  toggleRead() {
    this.setState({
      read: !this.state.read
    })
  }


  // var ratingPercent = (props.restaurant.rating / 5) * 100;
  render() {
  return (
    <div>
    <div className="box1">
    <h1 className="name" id="overview">{this.props.restaurant.name}</h1>
    </div>

    <div className="ratingsContainer">
    <div className="stars" style={{marginLeft: 0 + 'px'}}>
      <div className="ratings">
        <div className="empty-stars"></div>
        <div className="full-stars" style={{width: this.state.ratingPercent + '%'}}></div>
        </div>
      <div className="reviewNumber">&nbsp;&nbsp;{2.5}</div>
    </div>

    <div className="reviews"><img src="/images/icon1.png"/>&nbsp;&nbsp;{this.props.restaurant.reviews} reviews</div> 
    <div className="priceRanger"><img src="/images/icon2.png"/>&nbsp;&nbsp;${this.props.restaurant.priceStart}-${this.props.restaurant.priceEnd}</div>
    <div className="types"><img src="/images/icon3.png"/>&nbsp;&nbsp;{`basti`}</div>
    </div>
    <div className="tags"><Tags tags={JSON.parse(this.props.restaurant.tags)}/>
    </div>


    {this.state.read === false ? <div className="descriptionLess" id="description">{this.props.restaurant.description}</div> : <div className="descriptionMore" id="description">{this.props.restaurant.description}</div>}
    {this.state.read === false ? <div className="read" onClick={() => this.toggleRead()}>+ Read More</div> : <div className="read" onClick={() => this.toggleRead()}>- Read Less</div>}
    </div>
  )}
}

export default Description;
import React from 'react';
import Header from './Header.jsx';
import Modal from './Modal.jsx';
import Navbar from './Navbar.jsx';
import Description from './Description.jsx';
import Footer from './Footer.jsx';
import Photos from './Photos.jsx';
// import Reservation from './Reservation.jsx';
import Menu from './Menu.jsx';
import Reviews from './Reviews.jsx';
import Booking from './Booking.jsx';

import $ from 'jquery';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      restaurant: null,
      currentImage: 0,
      restaurantId: 1,
      images: null,
      redirect: false
    }
    this.handleModal = this.handleModal.bind(this)
  }

  componentDidMount(){
    this.getData();
  }
  
  getData() {
    const rid = window.location.pathname.split('/')[2];
    return $.ajax({
      url: `/api/restaurant/${rid}`,
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({
          restaurant: data,
          images: JSON.parse(data.photos)
        })
        $('.headerImg').css('background', `url(${JSON.parse(data.photos)[0].imgUrl}) center center`)
        $('.headerImg').css('background-size', 'cover');
      },
      error: () => {console.log('Error client get request')}
    })    
  }

  handleModal(e) {
    if(e.target.id !== "bookmark" && document.getElementById('myModal') !== null){
    document.getElementById('myModal').style.display = "block";
    this.setState({
      currentImage: parseInt(e.target.id)
    })
    }
    if (e.target.id === "closeModal" && document.getElementById('closeModal') !== null){
      document.getElementById('myModal').style.display = "none";
      this.setState({
        currentImage: 0
      })
    }
    if (e.target.id === "previousImage" && document.getElementById('previousImage') !== null){
      if (this.state.currentImage === 0){
        this.setState({
          currentImage: this.state.images.length - 1
        })  
      } else {      
        this.setState({
        currentImage: this.state.currentImage - 1
      })}
    }
    if (e.target.id === "nextImage" && document.getElementById('nextImage') !== null){
      if (this.state.currentImage === this.state.images.length - 1){
        this.setState({
          currentImage: 0
        })
      } else {
      this.setState({
        currentImage: this.state.currentImage + 1
      })}
    }
  }

  render() {
    return (
      <div>
      {this.state.restaurant !== null ? 
      <div>
        {/* <Header handleModal={this.handleModal} /> */}
        <Modal handleModal={this.handleModal} state={this.state}/>
        <div className="overview-container">
          <div className="overview">
            <Navbar />
            <Description restaurant={this.state.restaurant}/>
            <Booking />
            <Photos images={this.state.images} handleModal={this.handleModal}/>
            {/* <Menu /> */}
            {/* <Reviews restaurant={this.state.restaurant} /> */}
          </div>
          <div className="reservationContainer">
          {/* <Reservation /> */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
      : null }
      </div>
    )
  }
}

export default App;


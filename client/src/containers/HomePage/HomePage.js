import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import './HomePage.scss';
//im port section 
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import BestDoctor from './Section/BestDoctor';
import Handbook from './Section/Handbook';


// this is  two css of slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            arrows: false,
            swipeToSlide: true

        };
        return (
            <div>

                <HomeHeader />
                {/* css for Specialy and MedicalFacility in HomePage.scss  */}
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <BestDoctor settings={settings} />
                <Handbook settings={settings} />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

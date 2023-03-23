import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';

import HomeHeader from './HomeHeader';
//im port section 
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import BestDoctor from './Section/BestDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';

import HomeFooter from './HomeFooter';

// this is  two css of slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class HomePage extends Component {

    render() {
        let settings1 = {
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
        let settings2 = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            arrows: false,
            swipeToSlide: true

        };
        return (
            <div>

                <HomeHeader />
                {/* css for sections  in HomePage.scss  */}
                <Specialty settings={settings1} />
                <MedicalFacility settings={settings1} />
                <BestDoctor settings={settings1} />
                <Handbook settings={settings2} />
                <About />
                <HomeFooter />

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

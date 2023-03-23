import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import Slider1 from "../../../assets/slider/120331-co-xuong-khop.jpg";
import Slider2 from "../../../assets/slider/120741-tim-mach.jpg";
import Slider3 from "../../../assets/slider/120933-tieu-hoa.jpg";
import Slider4 from "../../../assets/slider/121042-than-kinh.jpg";
import Slider5 from "../../../assets/slider/121146-tai-mui-hong.jpg";
import Slider6 from "../../../assets/slider/121215-cot-song.jpg";
import Slider7 from "../../../assets/slider/121232-y-hoc-co-truyen.jpg";




class Specialty extends Component {

    render() {
        return (
            <div className="section-slider section-specialty">
                <div className="section-content">
                    <div className="section-header">
                        <span>Chuyên khoa phổ biến</span>
                        <button>Xem thêm </button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='slide-customize'>
                            <img src={Slider1} alt="" />
                            <p>Cơ xương khớp</p>
                        </div>
                        <div className='slide-customize'>
                            <img src={Slider2} alt="" />
                            <p>Tim mạch</p>
                        </div>
                        <div className='slide-customize'>
                            <img src={Slider3} alt="" />
                            <p>Tiêu hóa</p>
                        </div>
                        <div className='slide-customize'>
                            <img src={Slider4} alt="" />
                            <p>Thần kinh</p>
                        </div>
                        <div className='slide-customize'>
                            <img src={Slider5} alt="" />
                            <p>Tai mũi họng </p>
                        </div>
                        <div className='slide-customize'>
                            <img src={Slider6} alt="" />
                            <p>Cột sống</p>
                        </div>
                        <div className='slide-customize'>
                            <img src={Slider7} alt="" />
                            <p>Y học cổ truyền</p>
                        </div>
                    </Slider>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

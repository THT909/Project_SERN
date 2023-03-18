import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BestDoctor.scss';
import Slider1 from "../../../assets/slider/120331-co-xuong-khop.jpg";
import Slider2 from "../../../assets/slider/120741-tim-mach.jpg";
import Slider3 from "../../../assets/slider/120933-tieu-hoa.jpg";
import Slider4 from "../../../assets/slider/121042-than-kinh.jpg";
import Slider5 from "../../../assets/slider/121146-tai-mui-hong.jpg";
import Slider6 from "../../../assets/slider/121215-cot-song.jpg";
import Slider7 from "../../../assets/slider/121232-y-hoc-co-truyen.jpg";



import Slider from 'react-slick';
class BestDoctor extends Component {

    render() {
        return (
            <div className="section-slider section-bestdoctor">
                <div className="section-content">
                    <div className="section-header">
                        <span>Bác sĩ nổi bật tuần qua</span>
                        <button>Tìm kiếm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='slide-customize'>
                            <div className="border-custom">
                                <img src={Slider1} alt="" />
                                <p>Giáo sư tiến sĩ Hiệp Thành</p>
                                <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                            </div>
                        </div>
                        <div className='slide-customize'>
                            <div className="border-custom">
                                <img src={Slider2} alt="" />
                                <p>Giáo sư tiến sĩ Hiệp Thành</p>
                                <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                            </div>
                        </div>
                        <div className='slide-customize'>
                            <div className="border-custom">
                                <img src={Slider3} alt="" />
                                <p>Giáo sư tiến sĩ Hiệp Thành</p>
                                <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                            </div>
                        </div>
                        <div className='slide-customize'>
                            <div className="border-custom">
                                <img src={Slider4} alt="" />
                                <p>Giáo sư tiến sĩ Hiệp Thành</p>
                                <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                            </div>
                        </div>
                        <div className='slide-customize'>
                            <div className="border-custom">
                                <img src={Slider5} alt="" />
                                <p>Giáo sư tiến sĩ Hiệp Thành</p>
                                <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                            </div>
                        </div>
                        <div className='slide-customize'>
                            <div className="border-custom">
                                <img src={Slider6} alt="" />
                                <p>Giáo sư tiến sĩ Hiệp Thành</p>
                                <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                            </div>
                        </div>
                        <div className='slide-customize'>
                            <div className="border-custom">
                                <img src={Slider7} alt="" />
                                <p>Giáo sư tiến sĩ Hiệp Thành</p>
                                <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                            </div>
                        </div>
                    </Slider>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BestDoctor);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./About.scss";
import { FormattedMessage } from 'react-intl';


class About extends Component {


    render() {
        return (
            <div className="section-slider section-about">
                <div className="section-content">
                    <div className="section-header">
                        <span>Truyền thông nói về BookingCare </span>
                    </div>
                    <div className="about-content">
                        <div className="right-content">
                            <iframe width="100%" height="100%"
                                src="https://www.youtube.com/embed/QkbGr1rAya8"
                                title="Tilemap &amp; Tile Palette |
                                Build a 2D Platformer Game in Unity #2"
                                frameBorder="0" allow="accelerometer; autoplay;
                                clipboard-write; encrypted-media; gyroscope;
                                picture-in-picture; web-share"
                                allowFullScreen></iframe>
                        </div>
                        <div className="left-content">
                            <p>
                                Theo báo cáo của Bộ Tư pháp do Thứ trưởng Phan Chí Hiếu ký, riêng trong năm 2017, số văn bản trái pháp luật được phát hiện qua hoạt động kiểm tra văn bản theo thẩm quyền là 1.236 văn bản. Nội dung trái pháp luật của các văn bản này làm ảnh hướng tới tính đồng bộ, thống nhất và khả thi của hệ thống pháp luật.
                            </p>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

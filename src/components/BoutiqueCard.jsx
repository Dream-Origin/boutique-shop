import React from "react";
import "./BoutiqueCard.css";
import AboutBanner from '../data/images/about_banner.png';

const BoutiqueCard = () => {
    return (
        <section className={"about_section"}>
            <div className={"about_card"}>
                <img
                    src={AboutBanner}
                    alt="Boutique"
                    className={"about_image"}
                />
                <div className={"about_content"}>
                    <h2 className={"about_title"}> About Tharagai Boutique</h2>
                    <p className={"about_description"}>

                        <p> Tharagai Boutique is a premier destination in Hosur, Tamil Nadu, offering a curated collection of premium quality sarees, salwar materials, and handcrafted fabrics. Known for its exquisite designs and superior craftsmanship, the boutique sources its unique fabrics from across India, bringing customers an exclusive range that blends tradition with contemporary style.
                        </p>
                        <br/>
                        <p>
                            Our commitment lies in providing customers with authentic, handpicked sarees and salwar suits designed to celebrate elegance and cultural heritage. Whether you seek timeless handloom sarees or vibrant salwar materials, Tharagai Boutique promises quality, variety, and personalized service.
                        </p>
                        <br/>
                        <p>
                            Located conveniently in Amman Nagar, Dinnur, Hosur, the boutique is dedicated to enhancing your shopping experience with a warm and welcoming atmosphere. Discover the perfect attire for any occasion with us.
                        </p></p>
                    <button className={"about_button"}>Explore Collection</button>
                </div>
            </div>
        </section>
    );
};

export default BoutiqueCard;

import React from "react";
import "./BoutiqueCard.css";

const BoutiqueCard = () => {
    return (
        <section className="boutique_section">
            <div className="boutique_card">
                <h2 className="boutique_title">
                    Effortless Ethnic Wear for Every Day
                </h2>

                <p className="boutique_description">
                    Tharagai Boutique presents an exclusive curation of unstitched dress materials and premium ready-to-wear salwar sets, designed for those with a discerning taste for refined elegance.
                    <br /><br />
                    Every piece reflects our commitment to exceptional quality, superior comfort, and distinctive craftsmanship. From thoughtfully priced essentials to indulgent premium collections, Tharagai offers a seamless blend of tradition and sophistication.
                    <br /><br />
                    Our artisanal selections — Kalamkari, handwoven cottons, and Jamdani — honor India's rich textile heritage while embracing contemporary aesthetics. Each ensemble is effortlessly graceful, easy to style, and timelessly luxurious, preserving the charm of classic ethnic wear.
                    <br /><br />
                    At Tharagai, luxury is not just worn — it is experienced.
                </p>
            </div>
        </section>
    );
};

export default BoutiqueCard;

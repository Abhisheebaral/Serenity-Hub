import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfessionals } from "../../utils/api";
import DashboardNavbar from "../../components/DashboardNavbar";
import Footer from "../../components/Footer";
import "../../style/Professionals.css";

const Professionals = () => {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    const res = await getProfessionals();
    if (res.success !== false) {
      setProfessionals(res);
    }
  };

  const getImageSrc = (image) => {
    if (!image) return "/images/profileimage.png";
    if (image.startsWith("http")) return image;
    return `http://localhost:3000${image}`;
  };

  return (
    <div className="professionalsPage">
      <DashboardNavbar />

      <section className="professionalsHero">
        <h1>Find Mental Health Professionals</h1>
        <p>
          "Your mental health matters. Seek support, embrace wellness, and step
          into a brighter tomorrow."
        </p>
      </section>

      <section className="professionalsList">
        <div className="professionalsGrid">
          {professionals.map((pro) => (
            <div className="proCard" key={pro.id}>
              <div className="proTop">
                <img
                  src={getImageSrc(pro.image)}
                  alt={pro.name}
                />
                <div>
                  <h3>
                    {pro.name} <span className="verified">✔</span>
                  </h3>
                  <p className="role">{pro.specialization}</p>
                </div>
              </div>

              <div className="proDetails">
                <p><strong>Location:</strong> {pro.location}</p>
                <p><strong>Education:</strong> {pro.education}</p>
                <p><strong>Office Hours:</strong> {pro.officeHours}</p>
                <p><strong>Fees:</strong> Rs. {pro.fees}</p>
              </div>

              <button
                className="viewMoreBtn"
                onClick={() => navigate(`/professionals/${pro.id}`)}
              >
                View More →
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Professionals;
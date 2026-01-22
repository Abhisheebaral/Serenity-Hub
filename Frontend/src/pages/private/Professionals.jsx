import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/Professionals.css";

const Professionals = () => {
  const navigate = useNavigate();

  return (
    <div className="professionalsPage">
      <DashboardNavbar />

      {/* Header */}
      <section className="professionalsHero">
        <h1>Find Mental Health Professionals</h1>
        <p>
          "Your mental health matters. Seek support, embrace wellness, and step
          into a brighter tomorrow."
        </p>
      </section>

      {/* Cards */}
      <section className="professionalsList">
        <div className="professionalsGrid">

          {/* Card 1 */}
          <div className="proCard">
            <div className="proTop">
              <img src="/images/profileimage.png" alt="Psychologist" />
              <div>
                <h3>
                  Dr. Reema Karki <span className="verified">✔</span>
                </h3>
                <p className="role">Psychologist</p>
              </div>
            </div>

            <div className="proDetails">
              <p><strong>Location:</strong> Kathmandu, Lalitpur</p>
              <p><strong>Education:</strong> M.A. Psychology</p>
              <p><strong>Office Hours:</strong> 9 AM – 5 PM</p>
              <p><strong>Fees:</strong> Rs. 1000 – 2000</p>
            </div>

            <button
              className="viewMoreBtn"
              onClick={() => navigate("/professionals/1")}
            >
              View More →
            </button>
          </div>

          {/* Card 2 */}
          <div className="proCard">
            <div className="proTop">
              <img src="/images/profileimageboy.png" alt="Clinical Psychologist" />
              <div>
                <h3>
                  Dr. Rahul Shah <span className="verified">✔</span>
                </h3>
                <p className="role">Clinical Psychologist</p>
              </div>
            </div>

            <div className="proDetails">
              <p><strong>Location:</strong> Kathmandu</p>
              <p><strong>Education:</strong> M.Phil Clinical Psychology</p>
              <p><strong>Office Hours:</strong> 10 AM – 5 PM</p>
              <p><strong>Fees:</strong> 1000 – 1500</p>
            </div>

            <button
              className="viewMoreBtn"
              onClick={() => navigate("/professionals/2")}
            >
              View More →
            </button>
          </div>

          {/* Card 3 */}
          <div className="proCard">
            <div className="proTop">
              <img src="/images/profileimage.png" alt="Therapist" />
              <div>
                <h3>
                  Sara Shrestha <span className="verified">✔</span>
                </h3>
                <p className="role">Licensed Therapist</p>
              </div>
            </div>

            <div className="proDetails">
              <p><strong>Location:</strong> Kathmandu</p>
              <p><strong>Education:</strong> M.Sc Counseling Psychology</p>
              <p><strong>Office Hours:</strong> 9 AM – 7 PM</p>
              <p><strong>Fees:</strong> Depends</p>
            </div>

            <button
              className="viewMoreBtn"
              onClick={() => navigate("/professionals/3")}
            >
              View More →
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Professionals;

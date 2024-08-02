import React, { FunctionComponent, useEffect, useState } from "react";
import Nav from "../components/Nav";
import FirstNameField from "../components/FirstNameField";
import styles from "./AdminDashboard.module.css";

interface Appointment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  PhoneNumber: number;
}

const AdminDashboard: FunctionComponent = () => {

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data.appointments);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className={styles.adminDashboard}>
      
      <section className={styles.content}>
        <div className={styles.profile}>
          {loading ? (
            <p>Loading appointments...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.dashboardLayout}>
              <div className={styles.appointmentsAdmin}>
               <div className={styles.heading}><b>Appointments</b></div>
                {appointments.map((appointment) => (

                  <div key={appointment._id} className={styles.profileImage}>
                    <div className={styles.profileImageChild} />
                    <div className={styles.profileImageHolderParent}>
                      <div className={styles.profileImageHolder}>
                        <img
                          className={styles.istockphoto1476170969170667aIcon}
                          loading="lazy"
                          alt=""
                          src="/istockphoto1476170969170667a-1@2x.png"
                        />
                      </div>
                      <div className={styles.firstName}>
                        <FirstNameField
                          firstName="First Name"
                          firstNamePlaceholder={appointment.firstName}
                        />
                        <FirstNameField
                          firstName="Phone No."
                          firstNamePlaceholder={appointment.PhoneNumber.toString()}
                          propMinWidth="106px"
                        />
                        <div >
                      <button type="submit" className={`${styles.btn1} ${styles.accept}`}>Done</button>
                    </div>
                      </div>
                    </div>
                    <div className={styles.lastName}>
                      <FirstNameField
                        firstName="Last Name"
                        firstNamePlaceholder={appointment.lastName}
                        propMinWidth="110px"
                      />
                      <FirstNameField
                        firstName="Mail"
                        firstNamePlaceholder={appointment.email}
                        propMinWidth="43px"
                      />
                    </div>
                  </div>

                ))}
              </div>
              <div className={styles.appointmentsAdmin}>
                <div className={styles.heading}><b>Verify Properties</b></div>
                <div className={styles.formContainer}>
                  <form>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" id="firstName" placeholder="First Name" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phoneNo">Phone No.</label>
                      <input type="text" id="phoneNo" placeholder="Phone No." />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email address</label>
                      <input type="email" id="email" placeholder="Email address" />
                    </div>
                    <div className={styles.formButtons}>
                      <button type="submit" className={`${styles.btn} ${styles.accept}`}>Accept</button>
                      <button type="button" className={`${styles.btn} ${styles.reject}`}>Reject</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          )

          }
        </div>
      </section>
       <div className={styles.formButtons2}>
        <button type="submit" className={`${styles.btn} ${styles.accept}`}>Add Admin</button>
        <button type="button" className={`${styles.btn} ${styles.reject}`}>Remove Admin</button>
      </div>
    </div>
  );
};

export default AdminDashboard;

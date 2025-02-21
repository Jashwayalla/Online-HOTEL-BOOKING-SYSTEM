import "../../index.css"; // Make sure to create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Hotel Booking. All rights reserved.
          <span className="text-warning fw-bold">Taj krishna</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

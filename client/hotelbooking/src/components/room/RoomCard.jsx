import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-room/${room.id}`}>
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${room.photo}`}
                alt="Room Photo"
                style={{ width: "220px", height: "150px" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Text>₹{room.roomPrice}/night</Card.Text>
            <p></p>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    photo: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    roomPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};


export default RoomCard;

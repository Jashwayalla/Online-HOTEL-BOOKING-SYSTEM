import { useState } from "react"
import { Button, Container, Row, Col, Form } from "react-bootstrap"
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions"
import moment from "moment"
import "../../index.css" // Import the CSS file for styling

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [bookingInfo, setBookingInfo] = useState(null)

  const handleFindBooking = async () => {
    setIsLoading(true)
    setError("")
    setSuccessMessage("")
    try {
      const booking = await getBookingByConfirmationCode(confirmationCode)
      if (booking) {
        setBookingInfo(booking)
        setSuccessMessage("Booking found!")
      } else {
        setError("Booking not found.")
      }
    } catch (err) {
      console.error("Error fetching booking:", err)
      setError("An error occurred while fetching the booking.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async () => {
    setIsLoading(true)
    setError("")
    setSuccessMessage("")
    try {
      console.log("Attempting to cancel booking:", bookingInfo.id) // Log the booking ID
      const success = await cancelBooking(bookingInfo.id)
      if (success) {
        setSuccessMessage("Booking cancelled successfully!")
        setBookingInfo(null)
      } else {
        setError("Failed to cancel the booking. Please try again later.")
      }
    } catch (err) {
      console.error("Error cancelling booking:", err) // Log the error
      setError("An error occurred while cancelling the booking.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="find-booking-container">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Find Booking</h2>
          <Form>
            <Form.Group as={Row} controlId="confirmationCode" className="align-items-center">
              <Col xs={9}> {/* Adjust the column width */}
                <Form.Control
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter confirmation code"
                />
              </Col>
              <Col xs={3}> {/* Adjust the column width */}
                <Button
                  variant="primary"
                  onClick={handleFindBooking}
                  disabled={isLoading}
                  className="w-100"
                >
                  {isLoading ? "Loading..." : "Find Booking"}
                </Button>
              </Col>
            </Form.Group>
          </Form>

          {error && <p className="text-danger mt-3">{error}</p>}
          {successMessage && (
            <p className="text-success mt-3">{successMessage}</p>
          )}
          {bookingInfo && (
            <div className="mt-3">
              <h3>Booking Details</h3>
              <p>
                <strong>ID:</strong> {bookingInfo.id}
              </p>
              <p>
                <strong>Room Type:</strong> {bookingInfo.room.roomType}
              </p>
              <p>
                <strong>Booking Confirmation Code:</strong>{" "}
                {bookingInfo.bookingConfirmationCode}
              </p>
              <p>
                <strong>Check-in Date:</strong>{" "}
                {moment(bookingInfo.checkInDate).format("MMMM Do YYYY")}
              </p>
              <p>
                <strong>Check-out Date:</strong>{" "}
                {moment(bookingInfo.checkOutDate).format("MMMM Do YYYY")}
              </p>
              <Button
                variant="danger"
                onClick={handleCancelBooking}
                disabled={isLoading}
              >
                {isLoading ? "Cancelling..." : "Cancel Booking"}
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default FindBooking
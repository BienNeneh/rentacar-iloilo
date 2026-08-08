import { useEffect } from "react";
import { runBookingLifecycle } from "../../services/bookingLifecycleService";

function BookingLifecycle() {
  useEffect(() => {
    runBookingLifecycle();
  }, []);

  return null;
}

export default BookingLifecycle;
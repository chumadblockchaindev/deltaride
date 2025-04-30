import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api';
import { CarInterface } from './CarBooking';

interface Booking {
  car_id: number
  start_date: string
  end_date: string
  created_at: string
  id: number
}

function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [car, setCar] = useState<CarInterface[]>([])
  
  useEffect(() => {
    api.get('/api/booking/history/')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const fetchCar = async () => {
      for(let i = 0; i<=bookings.length-1; i++){
        try {
          const response = await api.post('/api/cars/detail/', {car_id: bookings[i].car_id});
          setCar(prev => [...prev, response.data]);
        } catch (err) {
          console.error("Error fetching car data", err);
        }
      }
    };

    fetchCar();
  }, [bookings]);

  const FetchCar = ({carId}: {carId: number}) => {
    const displayCar = car.filter(item => item.id !== carId)

    console.log(displayCar)

    return(
      <div>
      {car ? (
                    <div className="mt-2">
                      <p>Car: {displayCar[0].brand.name} {displayCar[0].model_name}</p>
                      <img src={displayCar[0].image} alt={car[0].model_name} className="w-48 rounded" />
                    </div>
                  ) : (
                    <p>Loading car info...</p>
                  )}  
      </div>
    )
  }

  return (
    <motion.div className="p-8 max-w-4xl mx-auto"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">📜 Booking History</h1>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking: Booking) => (
            <div key={booking.id} className="border p-4 rounded-xl shadow hover:shadow-lg transition">
              {/* <FetchCar carId={booking.car_id} />             */}
              <p>Date Booked: {new Date(booking.created_at).toLocaleDateString()}</p>
              <h3 className="font-semibold">Booking: {booking.start_date} → {booking.end_date}</h3>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default BookingHistory;

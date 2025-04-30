import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DateRange = [Date | null, Date | null];

export interface CarInterface {
  id: number,
  brand: { id: number, name: string },
  model_name: string,
  year: number,
  price_per_day: number,
  available: boolean,
  image: string
}

function formatDate(date: Date | null | undefined): string | null {
  if (!date || isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

function CarBooking() {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    api.get('/api/cars/list/')
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);


  const handleBooking = (car_id: number) => {
    const start_date = formatDate(startDate)
    const end_date = formatDate(startDate)
    console.log(start_date, end_date)
    api.post('/api/booking/book/', {car_id, start_date, end_date})
      .then(() => setMessage('✅ Booking successful!'))
      .catch(() => setMessage('❌ Booking failed.'));
  };

  return (
    <motion.div 
      className="p-8 max-w-3xl mx-auto space-y-6"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">🚗 Book a Car</h1>
        {cars.map((car: CarInterface) => (
          <div key={car.id} className='space-y-6'>
            <img src={car.image}  alt={car.model_name} className="w-full h-48 object-cover rounded" />
            <div className='flex justify-between '>
              <div>
                <div>{car.brand.name} - {car.model_name}</div>
                <div>Year - {car.year}</div>
                <div>Price Per Day - ${car.price_per_day}</div>
              </div>
              <div>
                <div className='flex justify-between'>
                  <label className="block mb-2 font-medium">Start Date</label>
                  <label className="block mb-2 font-medium">End Date</label>
                </div>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update: DateRange) => {
                    setDateRange(update);
                  }}
                  isClearable
                  className="border px-4 py-2 rounded w-full"
                  minDate={new Date()}
                  placeholderText="click to choose date"
                />
              </div>
            </div>
            <div>
              <button  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full w-full hover:scale-105 transition" 
              onClick={() => handleBooking(car.id)} disabled={!car.available}>{car.available ? "Book Now": "Car Unavailable"}</button>
            </div>
          </div>
        ))}
      {message && <div className="mt-6 text-center font-semibold">{message}</div>}
    </motion.div>
  );
}

export default CarBooking;

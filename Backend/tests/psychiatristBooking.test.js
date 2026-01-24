const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

// Mock Psychiatrist Model
const PsychiatristMock = dbMock.define('Psychiatrist', {
  id: 1,
  name: 'Dr. Smith',
  specialization: 'Child Psychiatry',
  experience: 10,
  hospital: 'Serenity Hub'
});

// Mock Booking Model
const BookingMock = dbMock.define('Booking', {
  id: 1,
  psychiatristId: 1,
  patientName: 'John Doe',
  date: '2026-01-25',
  time: '10:00 AM',
  status: 'Confirmed'
});

describe('SerenityHub Unit Testing: Psychiatrist Booking', () => {

  it('should create a psychiatrist with correct data', async () => {
    const psychiatrist = await PsychiatristMock.create({
      name: 'Dr. Smith',
      specialization: 'Child Psychiatry'
    });

    expect(psychiatrist.name).toBe('Dr. Smith');
    expect(psychiatrist.specialization).toBe('Child Psychiatry');
    expect(typeof psychiatrist.name).toBe('string');
    expect(typeof psychiatrist.experience).toBe('number');
  });

  it('should book a psychiatrist for a patient', async () => {
    const booking = await BookingMock.create({
      psychiatristId: 1,
      patientName: 'John Doe',
      date: '2026-01-25',
      time: '10:00 AM',
      status: 'Confirmed'
    });

    expect(booking.patientName).toBe('John Doe');
    expect(booking.psychiatristId).toBe(1);
    expect(booking.status).toBe('Confirmed');
    expect(typeof booking.date).toBe('string');
    expect(typeof booking.id).toBe('number');
  });

  it('should update booking status', async () => {
    const booking = await BookingMock.create({
      psychiatristId: 1,
      patientName: 'Jane Doe',
      date: '2026-01-26',
      time: '11:00 AM',
      status: 'Pending'
    });

    booking.status = 'Confirmed'; // simulate status update
    expect(booking.status).toBe('Confirmed');
  });
});

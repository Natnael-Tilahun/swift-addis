import axios from 'axios';
import { Booking } from '@/types/type';
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const getServices = async () => {
    try {
        const { data } = await api.get('/service');
        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};

export const getAddons = async () => {
  const { data } = await api.get('/addons');
  return data.data;
};

export const getAvailableSlots = async (date: string) => {
  const { data } = await api.get(`/available-slots?date=${date}`);
  return data.availableSlots;
};

export const createBooking = async (bookingData: Booking) => {
  const { data } = await api.post('/bookings', bookingData);
  console.log("new booking: ", data)
  return data;
};

// export const getServiceById = async (id: string) => {
//   const { data } = await api.get(`/service/${id}`);
//   return data;
// }; 


// export async function fetchBlogPosts() {
//   // For now, return the static blog posts
//   // In a real app, this would fetch from an API
//   return blogPosts;
// }

// Update the existing fetchServices function to handle errors
export async function fetchServices() {
  try {
    const { data } = await api.get('/service');
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return []; // Return empty array as fallback
  }
}

export const getServiceById = async (id: string) => {
  try {
    const { data } = await api.get(`/service/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching service by id:', error);
    return null; // Return null as fallback
  }
};

export const fetchAddons = async () => {
  try {
    const { data } = await api.get('/addons');
    return data;
  } catch (error) {
    console.error('Error fetching addons:', error);
    return []; // Return empty array as fallback
  }
};

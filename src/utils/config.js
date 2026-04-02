/**
 * Configuration for the API base URL.
 * In development, it defaults to the local backend address.
 * In production, it can be set via an environment variable VITE_API_BASE_URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default API_BASE_URL;

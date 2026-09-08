// MedAstra — Patient Service
import api from './api.js';

/**
 * Get all patients
 */
export const getPatients = () => api.get('/patients');

/**
 * Get a patient by ID
 * @param {string} id
 */
export const getPatientById = (id) => api.get(`/patients/${id}`);

/**
 * Update a patient's record
 * @param {string} id
 * @param {object} data
 */
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);

/**
 * Create a new patient record
 * @param {object} data
 */
export const createPatient = (data) => api.post('/patients', data);

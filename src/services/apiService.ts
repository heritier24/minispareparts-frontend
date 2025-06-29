import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: 'manager' | 'receptionist' | 'mechanic'
}

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
}

interface Service {
  id: string
  vehicle: Vehicle
  status: 'new-service' | 'in-service' | 'completed'
  assignedMechanic: string | null
  createdAt: string
}

interface Part {
  id: string
  name: string
  quantity: number
  lowStockThreshold: number
}

const api = axios.create({
  baseURL: 'http://localhost:8004/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const apiService = {
  // User-related methods
  async login (email: string, password: string): Promise<{ user: User; token: string } | null> {
    try {
      const response = await api.post('/login', { email, password })
      return response.data.data
    } catch (error) {
      console.error('Login failed:', error)
      return null
    }
  },

  async logout (): Promise<void> {
    try {
      await api.post('/logout')
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  },

  setCurrentUser (user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('token', token)
  },

  getCurrentUser (): User | null {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  },

  clearAll (): void {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  },

  // Vehicle-related methods
  async getVehicles (): Promise<Vehicle[]> {
    try {
      const response = await api.get('/vehicles')
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
      return []
    }
  },

  async addVehicle (vehicle: Vehicle): Promise<Vehicle | null> {
    try {
      const response = await api.post('/vehicles', vehicle)
      return response.data.data
    } catch (error) {
      console.error('Failed to add vehicle:', error)
      return null
    }
  },

  // Service-related methods
  async getServices (): Promise<Service[]> {
    try {
      const response = await api.get('/services')
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch services:', error)
      return []
    }
  },

  async addService (service: Service): Promise<Service | null> {
    try {
      const response = await api.post('/services', service)
      return response.data.data
    } catch (error) {
      console.error('Failed to add service:', error)
      return null
    }
  },

  async updateService (service: Service): Promise<Service | null> {
    try {
      const response = await api.put(`/services/${service.id}`, service)
      return response.data.data
    } catch (error) {
      console.error('Failed to update service:', error)
      return null
    }
  },

  // Part-related methods
  async getParts (): Promise<Part[]> {
    try {
      const response = await api.get('/parts')
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch parts:', error)
      return []
    }
  },

  async addPart (part: Part): Promise<Part | null> {
    try {
      const response = await api.post('/parts', part)
      return response.data.data
    } catch (error) {
      console.error('Failed to add part:', error)
      return null
    }
  },

  async updatePart (part: Part): Promise<Part | null> {
    try {
      const response = await api.put(`/parts/${part.id}`, part)
      return response.data.data
    } catch (error) {
      console.error('Failed to update part:', error)
      return null
    }
  },

  async deletePart (id: string): Promise<void> {
    try {
      await api.delete(`/parts/${id}`)
    } catch (error) {
      console.error('Failed to delete part:', error)
    }
  }
}

export { apiService }

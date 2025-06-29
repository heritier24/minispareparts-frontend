interface User {
    id: string
    name: string
    email: string
    password: string
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
const localStorageService = {
  initializeMockData (): void {
    if (!localStorage.getItem('users')) {
      const mockUsers: User[] = [
        { id: '1', name: 'Manager User', email: 'manager@example.com', password: 'password123', role: 'manager' },
        { id: '2', name: 'Receptionist User', email: 'receptionist@example.com', password: 'password123', role: 'receptionist' },
        { id: '3', name: 'Mechanic User', email: 'mechanic@example.com', password: 'password123', role: 'mechanic' }
      ]
      localStorage.setItem('users', JSON.stringify(mockUsers))
    }
    if (!localStorage.getItem('vehicles')) {
      const mockVehicles: Vehicle[] = [
        { id: '1', make: 'Toyota', model: 'Camry', year: 2020, licensePlate: 'ABC123' },
        { id: '2', make: 'Ford', model: 'F-150', year: 2018, licensePlate: 'XYZ789' },
        { id: '3', make: 'Honda', model: 'Civic', year: 2021, licensePlate: 'DEF456' }
      ]
      localStorage.setItem('vehicles', JSON.stringify(mockVehicles))
    }
    if (!localStorage.getItem('services')) {
      const mockServices: Service[] = [
        {
          id: '1',
          vehicle: { id: '1', make: 'Toyota', model: 'Camry', year: 2020, licensePlate: 'ABC123' },
          status: 'new-service',
          assignedMechanic: null,
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          vehicle: { id: '2', make: 'Ford', model: 'F-150', year: 2018, licensePlate: 'XYZ789' },
          status: 'in-service',
          assignedMechanic: 'Mechanic User',
          createdAt: '2024-01-14T09:00:00Z'
        },
        {
          id: '3',
          vehicle: { id: '3', make: 'Honda', model: 'Civic', year: 2021, licensePlate: 'DEF456' },
          status: 'completed',
          assignedMechanic: 'Mechanic User',
          createdAt: '2024-01-13T08:00:00Z'
        }
      ]
      localStorage.setItem('services', JSON.stringify(mockServices))
    }
    if (!localStorage.getItem('parts')) {
      const mockParts: Part[] = [
        { id: '1', name: 'Oil Filter', quantity: 5, lowStockThreshold: 10 },
        { id: '2', name: 'Brake Pads', quantity: 15, lowStockThreshold: 10 },
        { id: '3', name: 'Air Filter', quantity: 8, lowStockThreshold: 10 }
      ]
      localStorage.setItem('parts', JSON.stringify(mockParts))
    }
  },
  getUsers (): User[] {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  },
  setCurrentUser (user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user))
  },
  getCurrentUser (): User | null {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  },
  clearAll (): void {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('users')
    localStorage.removeItem('vehicles')
    localStorage.removeItem('services')
    localStorage.removeItem('parts')
  },
  getVehicles (): Vehicle[] {
    const vehicles = localStorage.getItem('vehicles')
    return vehicles ? JSON.parse(vehicles) : []
  },
  addVehicle (vehicle: Vehicle): void {
    const vehicles = this.getVehicles()
    vehicle.id = (vehicles.length + 1).toString()
    vehicles.push(vehicle)
    localStorage.setItem('vehicles', JSON.stringify(vehicles))
  },
  getServices (): Service[] {
    const services = localStorage.getItem('services')
    return services ? JSON.parse(services) : []
  },
  addService (service: Service): void {
    const services = this.getServices()
    service.id = (services.length + 1).toString()
    services.push(service)
    localStorage.setItem('services', JSON.stringify(services))
  },
  updateService (service: Service): void {
    const services = this.getServices()
    const index = services.findIndex(s => s.id === service.id)
    if (index !== -1) {
      services[index] = service
      localStorage.setItem('services', JSON.stringify(services))
    }
  },
  getParts (): Part[] {
    const parts = localStorage.getItem('parts')
    return parts ? JSON.parse(parts) : []
  },
  addPart (part: Part): void {
    const parts = this.getParts()
    part.id = (parts.length + 1).toString()
    parts.push(part)
    localStorage.setItem('parts', JSON.stringify(parts))
  },
  updatePart (part: Part): void {
    const parts = this.getParts()
    const index = parts.findIndex(p => p.id === part.id)
    if (index !== -1) {
      parts[index] = part
      localStorage.setItem('parts', JSON.stringify(parts))
    }
  },
  deletePart (id: string): void {
    const parts = this.getParts()
    const filteredParts = parts.filter(p => p.id !== id)
    localStorage.setItem('parts', JSON.stringify(filteredParts))
  }
}
localStorageService.initializeMockData()
export { localStorageService }

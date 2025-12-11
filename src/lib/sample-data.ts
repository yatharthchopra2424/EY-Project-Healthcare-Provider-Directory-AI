import { Provider } from './types';

export const sampleProviders: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    npi: '1234567890',
    specialty: ['Cardiology', 'Internal Medicine'],
    phone: '555-0101',
    address: '123 Medical Plaza, New York, NY 10001',
    email: 'dr.johnson@example.com',
    license: 'NY-12345',
    status: 'pending',
    confidence_score: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    npi: '9876543210',
    specialty: ['Pediatrics'],
    phone: '555-0102',
    address: '456 Healthcare Ave, Los Angeles, CA 90001',
    email: 'dr.chen@example.com',
    license: 'CA-67890',
    status: 'pending',
    confidence_score: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: ['Orthopedic Surgery'],
    phone: '555-0103',
    address: '789 Surgery Center, Chicago, IL 60601',
    status: 'pending',
    confidence_score: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '4',
    name: 'Dr. James Williams',
    npi: '5555555555',
    specialty: ['Family Medicine'],
    phone: '555-0104',
    address: '321 Family Care Dr, Houston, TX 77001',
    email: 'dr.williams@example.com',
    license: 'TX-11111',
    status: 'pending',
    confidence_score: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    npi: '4444444444',
    specialty: ['Dermatology'],
    phone: '555-0105',
    address: '654 Skin Care Blvd, Miami, FL 33101',
    status: 'pending',
    confidence_score: 0,
    created_at: new Date(),
    updated_at: new Date()
  }
];

export function generateSampleProviders(count: number): Provider[] {
  const specialties = [
    'Cardiology', 'Pediatrics', 'Orthopedics', 'Neurology', 'Dermatology',
    'Family Medicine', 'Internal Medicine', 'Psychiatry', 'Radiology', 'Oncology'
  ];

  const cities = [
    { city: 'New York', state: 'NY', zip: '10001' },
    { city: 'Los Angeles', state: 'CA', zip: '90001' },
    { city: 'Chicago', state: 'IL', zip: '60601' },
    { city: 'Houston', state: 'TX', zip: '77001' },
    { city: 'Phoenix', state: 'AZ', zip: '85001' },
    { city: 'Philadelphia', state: 'PA', zip: '19101' },
    { city: 'San Antonio', state: 'TX', zip: '78201' },
    { city: 'San Diego', state: 'CA', zip: '92101' },
    { city: 'Dallas', state: 'TX', zip: '75201' },
    { city: 'San Jose', state: 'CA', zip: '95101' }
  ];

  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Barbara'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  const providers: Provider[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];

    const hasNPI = Math.random() > 0.2;
    const hasEmail = Math.random() > 0.3;
    const hasLicense = Math.random() > 0.25;

    providers.push({
      id: `${i + 1}`,
      name: `Dr. ${firstName} ${lastName}`,
      npi: hasNPI ? `${Math.floor(1000000000 + Math.random() * 9000000000)}` : undefined,
      specialty: [specialty],
      phone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      address: `${Math.floor(Math.random() * 9999) + 1} Medical Plaza, ${location.city}, ${location.state} ${location.zip}`,
      email: hasEmail ? `dr.${lastName.toLowerCase()}@example.com` : undefined,
      license: hasLicense ? `${location.state}-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      status: 'pending',
      confidence_score: 0,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  return providers;
}

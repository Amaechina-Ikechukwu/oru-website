// ORU API Client

let rawBaseUrl = (import.meta as any).env.VITE_ORU_API_BASE_URL || 'https://oruapi-etekchgyh2a6f7gr.polandcentral-01.azurewebsites.net';
// Ensure the base URL starts with http:// or https:// to avoid treating it as a relative path
if (rawBaseUrl && !rawBaseUrl.startsWith('http://') && !rawBaseUrl.startsWith('https://')) {
  rawBaseUrl = 'https://' + rawBaseUrl;
}
const BASE_URL = rawBaseUrl;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export enum StudyLevel {
  Certificate = 1,
  Diploma = 2,
  Undergraduate = 3,
  PostgraduateDiploma = 4,
  Masters = 5,
}

export enum ApplicationStatus {
  Pending = 0,
  UnderReview = 1,
  Approved = 2,
  Rejected = 3,
}

export enum AccountStatus {
  Active = 0,
  Suspended = 1,
  Graduated = 2,
}

export enum AnnouncementCategory {
  News = 0,
  Event = 1,
  Seminar = 2,
  Academic = 3,
  Gallery = 4,
}

export enum InstallmentStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface PaginatedResult<T> {
  total: number;
  page: number;
  pageSize: number;
  items?: T[];
  students?: T[];
}

// Authentication & Token Management
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('oru_auth_token');
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('oru_auth_token', token);
  }
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('oru_auth_token');
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const result = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error((result && result.message) || `API Error: ${response.status} ${response.statusText}`);
  }

  return result as ApiResponse<T>;
}

// ============================================
// Auth API
// ============================================
export const authApi = {
  studentLogin: (credentials: any) => 
    fetchApi<any>('/api/auth/student/login', { method: 'POST', body: JSON.stringify(credentials) }),
  adminLogin: (credentials: any) =>
    fetchApi<any>('/api/auth/admin/login', { method: 'POST', body: JSON.stringify(credentials) }),
  changeStudentPassword: (data: any) =>
    fetchApi<any>('/api/auth/student/change-password', { method: 'POST', body: JSON.stringify(data) })
};

// ============================================
// Public Applications API
// ============================================
export const applicationsApi = {
  getStudyLevels: () => fetchApi<any[]>('/api/applications/study-levels', { method: 'GET' }),
  submitApplication: (data: any) => fetchApi<any>('/api/applications', { method: 'POST', body: JSON.stringify(data) }),
  checkStatus: (email: string) => fetchApi<any>(`/api/applications/status/${encodeURIComponent(email)}`, { method: 'GET' }),
  uploadDocuments: (id: string, name: string, formData: FormData) => fetchApi<any>(`/api/applications/${id}/documents?name=${encodeURIComponent(name)}`, { method: 'POST', body: formData }),
  replaceDocument: (id: string, documentId: string, formData: FormData) => fetchApi<any>(`/api/applications/${id}/documents/${documentId}`, { method: 'PUT', body: formData }),
  deleteDocument: (id: string, documentId: string) => fetchApi<any>(`/api/applications/${id}/documents/${documentId}`, { method: 'DELETE' })
};

// ============================================
// Student Self-Service API
// ============================================
export const studentApi = {
  getProfile: () => fetchApi<any>('/api/students/me', { method: 'GET' }),
  getAcademics: () => fetchApi<any>('/api/students/me/academics', { method: 'GET' }),
  getFinancials: () => fetchApi<any>('/api/students/me/financials', { method: 'GET' }),
  getInstallments: () => fetchApi<any[]>('/api/students/me/installments', { method: 'GET' }),
  submitInstallment: (formData: FormData) => fetchApi<any>('/api/students/me/installments', { method: 'POST', body: formData })
};

// ============================================
// Admin API
// ============================================
export const adminApi = {
  listApplications: (status: number = 0, page: number = 1, pageSize: number = 20) => 
    fetchApi<PaginatedResult<any>>(`/api/admin/applications?status=${status}&page=${page}&pageSize=${pageSize}`, { method: 'GET' }),
  getApplication: (id: string) => fetchApi<any>(`/api/admin/applications/${id}`, { method: 'GET' }),
  updateApplicationStatus: (id: string, status: number) => fetchApi<any>(`/api/admin/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  admitStudent: (id: string) => fetchApi<any>(`/api/admin/applications/${id}/admit`, { method: 'POST' }),
  
  listStudents: (program?: string, status?: number, page: number = 1, pageSize: number = 20) => {
    let url = `/api/admin/students?page=${page}&pageSize=${pageSize}`;
    if (program) url += `&program=${encodeURIComponent(program)}`;
    if (status !== undefined) url += `&status=${status}`;
    return fetchApi<PaginatedResult<any>>(url, { method: 'GET' });
  },
  getStudent: (id: string) => fetchApi<any>(`/api/admin/students/${id}`, { method: 'GET' }),
  updateAcademics: (id: string, data: any) => fetchApi<any>(`/api/admin/students/${id}/academics`, { method: 'PATCH', body: JSON.stringify(data) }),
  addGrade: (id: string, data: any) => fetchApi<any>(`/api/admin/students/${id}/grades`, { method: 'POST', body: JSON.stringify(data) }),
  updateStudentStatus: (id: string, status: number) => fetchApi<any>(`/api/admin/students/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  setTuition: (id: string, totalTuitionDue: number) => fetchApi<any>(`/api/admin/students/${id}/tuition`, { method: 'PATCH', body: JSON.stringify({ totalTuitionDue }) }),
  getStudentInstallments: (id: string) => fetchApi<any[]>(`/api/admin/students/${id}/installments`, { method: 'GET' }),
  reviewInstallment: (studentId: string, submissionId: string, status: number) => fetchApi<any>(`/api/admin/students/${studentId}/installments/${submissionId}`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  listCourses: (includeDeleted: boolean = false, page: number = 1, pageSize: number = 20) => 
    fetchApi<PaginatedResult<any>>(`/api/admin/courses?includeDeleted=${includeDeleted}&page=${page}&pageSize=${pageSize}`, { method: 'GET' }),
  createCourse: (data: any) => fetchApi<any>('/api/admin/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id: string, data: any) => fetchApi<any>(`/api/admin/courses/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteCourse: (id: string) => fetchApi<any>(`/api/admin/courses/${id}`, { method: 'DELETE' }),

  listStudyLevels: () => fetchApi<any[]>('/api/admin/study-levels', { method: 'GET' }),
  createStudyLevel: (data: any) => fetchApi<any>('/api/admin/study-levels', { method: 'POST', body: JSON.stringify(data) }),
  updateStudyLevel: (id: string, data: any) => fetchApi<any>(`/api/admin/study-levels/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteStudyLevel: (id: string) => fetchApi<any>(`/api/admin/study-levels/${id}`, { method: 'DELETE' }),

  createAnnouncement: (data: any) => fetchApi<any>('/api/admin/announcements', { method: 'POST', body: JSON.stringify(data) }),
  updateAnnouncement: (id: string, data: any) => fetchApi<any>(`/api/admin/announcements/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteAnnouncement: (id: string) => fetchApi<any>(`/api/admin/announcements/${id}`, { method: 'DELETE' }),
  uploadAnnouncementImages: (id: string, formData: FormData) => fetchApi<any>(`/api/admin/announcements/${id}/images`, { method: 'POST', body: formData }),
  removeAnnouncementImage: (id: string, imageUrl: string) => fetchApi<any>(`/api/admin/announcements/${id}/images?imageUrl=${encodeURIComponent(imageUrl)}`, { method: 'DELETE' }),

  listAdmins: () => fetchApi<any[]>('/api/admin/admins', { method: 'GET' }),
  createAdmin: (data: any) => fetchApi<any>('/api/admin/admins', { method: 'POST', body: JSON.stringify(data) }),
  deactivateAdmin: (id: string) => fetchApi<any>(`/api/admin/admins/${id}`, { method: 'DELETE' }),
};

// ============================================
// Public Courses & Announcements API
// ============================================
export const publicApi = {
  listCourses: (page: number = 1, pageSize: number = 20) => 
    fetchApi<PaginatedResult<any>>(`/api/courses?page=${page}&pageSize=${pageSize}`, { method: 'GET' }),
  getCourse: (id: string) => fetchApi<any>(`/api/courses/${id}`, { method: 'GET' }),
  
  listAnnouncements: (category?: number, page: number = 1, pageSize: number = 10) => {
    let url = `/api/announcements?page=${page}&pageSize=${pageSize}`;
    if (category !== undefined) url += `&category=${category}`;
    return fetchApi<PaginatedResult<any>>(url, { method: 'GET' });
  },
  getAnnouncement: (id: string) => fetchApi<any>(`/api/announcements/${id}`, { method: 'GET' }),
  
  getHealthStatus: () => fetchApi<any>('/api/health/basic', { method: 'GET' })
};

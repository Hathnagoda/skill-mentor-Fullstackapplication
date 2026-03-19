const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type')

  let data: any = null

  if (contentType && contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    throw new Error(data?.message || data || 'Request failed')
  }

  return data
}

function getAuthHeaders(token?: string) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function fetchMentors() {
  const response = await fetch(`${API_BASE_URL}/mentors`)
  return handleResponse(response)
}

export async function fetchMentorById(id: string) {
  const response = await fetch(`${API_BASE_URL}/mentors/${id}`)
  return handleResponse(response)
}

export async function fetchSubjectsByMentorId(id: string) {
  const response = await fetch(`${API_BASE_URL}/mentors/${id}/subjects`)
  return handleResponse(response)
}

export async function createSubject(
  token: string,
  subjectData: {
    name: string
    description: string
    mentorId: number
  }
) {
  const response = await fetch(`${API_BASE_URL}/subjects`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(subjectData),
  })

  return handleResponse(response)
}

export async function createMentor(token: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/mentors`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  })

  return handleResponse(response)
}

export async function createSession(
  token: string,
  sessionData: {
    studentName: string
    sessionDateTime: string
    durationMinutes: number
    mentorId: number
    subjectId: number
    paymentSlipUrl: string
  }
) {
  const response = await fetch(`${API_BASE_URL}/sessions`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(sessionData),
  })

  return handleResponse(response)
}

export async function fetchSessionsByStudentName(token: string, studentName: string) {
  const response = await fetch(`${API_BASE_URL}/sessions/student/${studentName}`, {
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}

export async function fetchAllSessions(token: string) {
  const response = await fetch(`${API_BASE_URL}/sessions`, {
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}

export async function fetchSessionsByStatus(token: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/sessions/status/${status}`, {
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}

export async function fetchSessionsByPaymentStatus(token: string, paymentStatus: string) {
  const response = await fetch(`${API_BASE_URL}/sessions/payment-status/${paymentStatus}`, {
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}

export async function confirmPayment(token: string, sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/confirm-payment`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}

export async function confirmSession(token: string, sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/confirm-session`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}

export async function completeSession(token: string, sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/complete-session`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}

export async function updateMeetingLink(token: string, sessionId: number, meetingLink: string) {
  const response = await fetch(
    `${API_BASE_URL}/sessions/${sessionId}/meeting-link?meetingLink=${encodeURIComponent(meetingLink)}`,
    {
      method: 'PATCH',
      headers: getAuthHeaders(token),
    }
  )

  return handleResponse(response)
}

export async function cancelSession(token: string, sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/cancel`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
  })

  return handleResponse(response)
}
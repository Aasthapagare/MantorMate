const PROJECT_BASE_URL = 'http://localhost:9095';

const getToken = () => localStorage.getItem('token');

const buildAuthHeaders = (headers = {}) => ({
  Authorization: getToken() ? `Bearer ${getToken()}` : '',
  ...headers
});

const parseJson = async (response, fallbackMessage) => {
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = text || null;
  }

  if (!response.ok) {
    throw new Error(data?.message || text || fallbackMessage);
  }

  return data;
};

export const getStudentGroupId = async (userId) => {
  const response = await fetch(`${PROJECT_BASE_URL}/groups/user/${userId}`, {
    method: 'GET',
    headers: buildAuthHeaders()
  });

  return parseJson(response, 'Failed to fetch group id');
};

export const getStudentDocuments = async (groupId) => {
  const response = await fetch(`${PROJECT_BASE_URL}/groups/${groupId}/documents`, {
    method: 'GET',
    headers: buildAuthHeaders()
  });

  return parseJson(response, 'Failed to fetch documents');
};

export const uploadStudentDocument = async (groupId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${PROJECT_BASE_URL}/groups/${groupId}/upload`, {
    method: 'POST',
    headers: buildAuthHeaders(),
    body: formData
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || 'Failed to upload document');
  }

  return text;
};

export const deleteStudentDocument = async (groupId, documentId) => {
  const response = await fetch(`${PROJECT_BASE_URL}/groups/${groupId}/documents/${documentId}`, {
    method: 'DELETE',
    headers: buildAuthHeaders()
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || 'Failed to delete document');
  }

  return text;
};

export const getGuideDocuments = async (groupId) => {
  const response = await fetch(`${PROJECT_BASE_URL}/guide/documents/${groupId}`, {
    method: 'GET',
    headers: buildAuthHeaders()
  });

  return parseJson(response, 'Failed to fetch guide documents');
};

export const buildDocumentUrl = (fileUrl) => {
  if (!fileUrl) {
    return '#';
  }

  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    return fileUrl;
  }

  return `${PROJECT_BASE_URL}${fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`}`;
};

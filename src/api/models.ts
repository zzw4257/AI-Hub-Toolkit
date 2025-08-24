interface AddModelData {
  name: string;
  provider: string;
  apiKey: string;
}

export async function getModels() {
  const response = await fetch('http://localhost:3001/api/models');
  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }
  return await response.json();
}

export async function testModel(modelId: string, prompt: string) {
  const response = await fetch('http://localhost:3001/api/models/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ modelId, prompt }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to test model');
  }
  return await response.json();
}

export async function addModel(modelData: AddModelData) {
  const response = await fetch('http://localhost:3001/api/models', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(modelData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add model');
  }
  return await response.json();
}

export async function deleteModel(id: string) {
  const response = await fetch(`http://localhost:3001/api/models/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete model');
  }
  return await response.json();
}

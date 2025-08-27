const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:3001/api/admin/login', {
      email: 'test@darkei.com',
      password: 'Test123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login successful:', response.data);
    console.log('Cookies:', response.headers['set-cookie']);
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
}

testLogin();
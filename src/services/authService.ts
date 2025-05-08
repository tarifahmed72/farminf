import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-api.farmeasytechnologies.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

interface ExchangeCodeResponse {
    access_token: string;
    refresh_token: string;
}

const AuthService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    console.log('Login attempt with:', { username, password });
    const response = await api.post<LoginResponse>('/login', {
      username,
      password,
    });
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>('/refresh-token', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  exchangeCode: async (code: string): Promise<ExchangeCodeResponse> => {
    const response = await api.post<ExchangeCodeResponse>('/exchange-code', {
        code: code,
    });
    return response.data;
  },
};

export default AuthService;
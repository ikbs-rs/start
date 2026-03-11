
const normalizeToken = (token) => (token || '').toString().replace(/^Bearer\s+/i, '').trim();

const getTokensLS = async () => {
    const token = normalizeToken(localStorage.getItem('token'));
    const refreshToken = normalizeToken(localStorage.getItem('refreshToken'));

    if (!token || !refreshToken) {
        return null;
    }
    const jwtObj = {
        token: `Bearer ${token}`,
        refreshToken: `Bearer ${refreshToken}`,
    }
    return jwtObj;
}

export default { getTokensLS };

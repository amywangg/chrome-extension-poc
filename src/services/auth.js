import ApiService from '../../services/api';
const api = 'localhost:3000/api';

async function verifySession(sessionCookie) {
  try {
    const response = await ApiService.get(`${api}/user/verify`, {
      session: sessionCookie,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// return new Promise(function (resolve, reject) {
//     axios
//       .post(`${API_URL}/purchase/create`, {
//         client_id: user.id,
//         amount: totalCost,
//       })
//       .then((response) => resolve(response.data));
//   }).then((result) => {
//     return result;
//   });

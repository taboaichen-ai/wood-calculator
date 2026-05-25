export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  // 如果沒有帶入驗證資訊，彈出瀏覽器內建的登入視窗
  if (!authHeader) {
    return new Response('請輸入帳號密碼', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // 解析使用者輸入的帳號密碼
  const auth = atob(authHeader.split(' ')[1]);
  const [user, pwd] = auth.split(':');

  // ----------------------------------------------------
  // ▼ 在這裡設定您的內部專用帳號與密碼 (執行於主機端，絕對安全)
  // ----------------------------------------------------
  const correctUser = 'yumu';
  const correctPwd = 'wood'; 

  // 驗證比對
  if (user === correctUser && pwd === correctPwd) {
    return; // 密碼正確，放行請求，Vercel 會順利載入 index.html
  }

  // 密碼錯誤，重新要求輸入
  return new Response('帳號或密碼錯誤', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

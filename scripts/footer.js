function setupFooterContacts() {
  const wechatRadio = document.getElementById('wechat-radio');
  const lineRadio = document.getElementById('line-radio');
  const otherRadio = document.getElementById('other-radio');
  const wechatQrcode = document.getElementById('footer-qrcode-wechat');
  const lineQrcode = document.getElementById('footer-qrcode-line');
  const otherInfo = document.getElementById('phone-email-container');
  const email = document.getElementById('footer-email');
  const phone = document.getElementById('footer-phone');

  wechatRadio.addEventListener('change', () => {
    if (wechatRadio.checked) {
      wechatQrcode.style.display = '';
      lineQrcode.style.display = 'none';
      otherInfo.style.display = 'none';
    }
  });

  lineRadio.addEventListener('change', () => {
    if (lineRadio.checked) {
      wechatQrcode.style.display = 'none';
      lineQrcode.style.display = '';
      otherInfo.style.display = 'none';
    }
  });

  otherRadio.addEventListener('change', () => {
    if (otherRadio.checked) {
      email.textContent = 'flybullinc@gmail.com';
      phone.textContent = '1(747)359-2855';
      wechatQrcode.style.display = 'none';
      lineQrcode.style.display = 'none';
      otherInfo.style.display = 'flex';
    }
  });
};
  
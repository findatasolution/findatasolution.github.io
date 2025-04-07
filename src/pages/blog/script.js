
function toggleSub(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  sidebar.classList.toggle('collapsed');
  main.classList.toggle('squeezed');
}


function loadPage(filename) {
  console.log(`Đang tải trang: ${filename}`); // In ra tên tệp đang được tải
  fetch(`pages/${filename}`)
    .then(response => {
      if (!response.ok) {
        console.log(`Lỗi tải trang: ${response.status}`); // In mã lỗi nếu trang không tải được
        throw new Error('Page not found');
      }
      return response.text();
    })
    .then(html => {
      // Cập nhật nội dung của trang chính
      document.getElementById("main-content").innerHTML = html;

      // Thay đổi URL trong thanh địa chỉ trình duyệt mà không reload trang
      history.pushState({ page: filename }, "", filename);
    })
    .catch(error => {
      console.error("Lỗi:", error); // In lỗi chi tiết vào console
      document.getElementById("main-content").innerHTML = "<h2>404 - Page not found</h2>";
    });
}

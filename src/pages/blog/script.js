function toggleSub(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main-content');
  sidebar.classList.toggle('collapsed');
  main.classList.toggle('squeezed');
}


function loadPage(filename) {
  fetch(`pages/${filename}`)
    .then(response => {
      if (!response.ok) throw new Error('Page not found');
      return response.text();
    })
    .then(html => {
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML = html;

      // Gọi lại MathJax
      if (window.MathJax && window.MathJax.Hub) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, mainContent]);
      }

      history.pushState({ page: filename }, "", filename);
    })
    .catch(error => {
      console.error("Lỗi:", error);
      document.getElementById("main-content").innerHTML = "<h2>404 - Page not found</h2>";
    });
}



// Prevent right-click
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Disable Ctrl+C, Ctrl+U, Ctrl+Shift+I (Inspect), etc.
document.addEventListener('keydown', function (e) {
  if (
    (e.ctrlKey && (e.key === 'c' || e.key === 'u')) ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.metaKey && (e.key === 'c' || e.key === 'u'))
  ) {
    e.preventDefault();
  }
});

function loadPageAndToggle(page, id) {
  loadPage(page);
  toggleSub(id);
}


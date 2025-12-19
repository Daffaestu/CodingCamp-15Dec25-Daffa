
// Smooth scroll 
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a.nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY - 70, // offset for sticky nav
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Greeting popup on refresh
document.addEventListener('DOMContentLoaded', function() {
    welcomeMessage();

    // Waktu berjalan
    function updateTime() {
        var timeEl = document.getElementById("time");
        if (timeEl) timeEl.innerText = new Date().toString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Form Message Us
    var form = document.getElementById("messageForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            // Remove previous errors
            var errorEls = form.querySelectorAll('.error-msg');
            errorEls.forEach(function(n) { n.remove(); });

            var nama = document.getElementById("nama").value.trim();
            var tgl = document.getElementById("tglLahir").value.trim();
            var jkEl = document.querySelector('input[name="jk"]:checked');
            var jk = jkEl ? jkEl.value : "";
            var pesan = document.getElementById("pesan").value.trim();

            var valid = true;
            if (!nama) {
                showFieldError(document.getElementById("nama"), "Nama wajib diisi");
                valid = false;
            }
            if (!tgl) {
                showFieldError(document.getElementById("tglLahir"), "Tanggal lahir wajib diisi");
                valid = false;
            }
            if (!jk) {
                var jkGroup = document.getElementById("jkGroup");
                if (jkGroup) {
                    var err = document.createElement('div');
                    err.className = 'error-msg';
                    err.textContent = 'Jenis kelamin wajib dipilih';
                    err.style.color = 'crimson';
                    err.style.fontSize = '0.9rem';
                    err.style.marginTop = '6px';
                    jkGroup.appendChild(err);
                }
                valid = false;
            }
            if (!pesan) {
                showFieldError(document.getElementById("pesan"), "Pesan wajib diisi");
                valid = false;
            }
            if (!valid) return;

            document.getElementById("outNama").innerText = nama;
            document.getElementById("outTgl").innerText = tgl;
            document.getElementById("outJk").innerText = jk;
            document.getElementById("outPesan").innerText = pesan;
        });
    }
});

function welcomeMessage() {
    const userInput = prompt('Please enter your name:');
    const welcomDOM = document.getElementById('welcome-speech');
    if (welcomDOM) {
        if (userInput === null || userInput.trim() === '') {
            welcomDOM.innerHTML = 'Welcome, Guest!';
        } else {
            welcomDOM.innerHTML = 'Welcome, ' + userInput + '!';
        }
    }
}

function showFieldError(inputEl, message) {
    if (!inputEl || !inputEl.parentNode) return;
    var err = document.createElement('div');
    err.className = 'error-msg';
    err.textContent = message;
    err.style.color = 'crimson';
    err.style.fontSize = '0.9rem';
    err.style.marginTop = '6px';
    inputEl.parentNode.appendChild(err);
}
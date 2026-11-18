
// ===================================
// MATH & PROGRAMMING ACADEMY
// ===================================

let currentUser = null;

// DATA MATERI
const mathLessons = [
    {
        title: "Aljabar",
        description: "Mempelajari variabel, persamaan, dan pertidaksamaan.",
        content: "Aljabar adalah cabang matematika yang menggunakan huruf atau simbol untuk mewakili bilangan.",
        example: "2x + 4 = 10\n2x = 10 - 4\n2x = 6\nx = 3"
    },
    {
        title: "Kalkulus",
        description: "Mempelajari limit, turunan, dan integral.",
        content: "Kalkulus mempelajari perubahan dan akumulasi. Turunan digunakan untuk menentukan laju perubahan, sedangkan integral digunakan untuk menghitung luas dan akumulasi.",
        example: "Jika f(x) = x²\nMaka f'(x) = 2x"
    },
    {
        title: "Statistika",
        description: "Mempelajari mean, median, modus, dan variansi.",
        content: "Statistika merupakan ilmu yang mempelajari pengumpulan, pengolahan, analisis, dan penyajian data.",
        example: "Data: 70, 80, 90\nMean = (70 + 80 + 90) / 3\nMean = 80"
    },
    {
        title: "Matriks",
        description: "Mempelajari operasi dan determinan matriks.",
        content: "Matriks adalah susunan bilangan berbentuk baris dan kolom.",
        example: "A = [1  2]\n    [3  4]\n\nDeterminan A = (1×4) - (2×3)\n= -2"
    },
    {
        title: "Teori Graf",
        description: "Mempelajari simpul, sisi, dan algoritma graf.",
        content: "Graf adalah struktur matematika yang terdiri dari simpul (vertex) dan sisi (edge). Graf dapat digunakan untuk memodelkan jaringan dan rute.",
        example: "V = {A, B, C}\nE = {(A,B), (B,C)}"
    }
];

const programmingLessons = [
    {
        title: "Dasar Python",
        description: "Mengenal bahasa pemrograman Python.",
        content: "Python merupakan bahasa pemrograman yang mudah dipelajari dan banyak digunakan dalam komputasi matematika, analisis data, dan kecerdasan buatan.",
        example: 'nama = "Irfan"\nprint("Halo", nama)'
    },
    {
        title: "Variabel dan Tipe Data",
        description: "Mengenal string, integer, float, dan boolean.",
        content: "Variabel adalah tempat menyimpan data. Tipe data menentukan jenis nilai yang disimpan.",
        example: 'nama = "Irfan"  # String\numur = 20       # Integer\nipk = 3.75      # Float\naktif = True    # Boolean'
    },
    {
        title: "Percabangan If Else",
        description: "Membuat keputusan dalam program.",
        content: "If else digunakan untuk menjalankan perintah berdasarkan kondisi tertentu.",
        example: "nilai = 85\n\nif nilai >= 75:\n    print('Lulus')\nelse:\n    print('Tidak Lulus')"
    },
    {
        title: "Perulangan For",
        description: "Mengulang perintah secara otomatis.",
        content: "For loop digunakan untuk menjalankan perintah berulang kali.",
        example: "for i in range(1, 6):\n    print(i)"
    },
    {
        title: "Function",
        description: "Membuat fungsi agar kode lebih terstruktur.",
        content: "Function merupakan blok kode yang dibuat untuk menjalankan tugas tertentu dan dapat dipanggil kembali.",
        example: "def tambah(a, b):\n    return a + b\n\nprint(tambah(5, 3))"
    },
    {
        title: "HTML, CSS, JavaScript",
        description: "Membangun website dari dasar.",
        content: "HTML membangun struktur halaman, CSS mengatur tampilan, dan JavaScript membuat halaman menjadi interaktif.",
        example: '<h1>Halo Dunia</h1>\n<button onclick="alert(\'Halo!\')">Klik Saya</button>'
    },
    {
        title: "Algoritma dan Sorting",
        description: "Mempelajari logika dan pengurutan data.",
        content: "Algoritma adalah langkah-langkah sistematis untuk menyelesaikan masalah. Sorting merupakan proses mengurutkan data.",
        example: "data = [5, 2, 8, 1]\ndata.sort()\nprint(data)"
    },
    {
        title: "Data Science",
        description: "Analisis data menggunakan Python.",
        content: "Data Science menggabungkan statistika, pemrograman, dan analisis data. Library yang sering digunakan adalah NumPy, Pandas, dan Matplotlib.",
        example: "import numpy as np\n\ndata = np.array([10, 20, 30])\nprint(np.mean(data))"
    }
];

// DATABASE
function getDatabase() {
    return JSON.parse(localStorage.getItem("mpa_users") || "{}");
}

function saveDatabase(database) {
    localStorage.setItem("mpa_users", JSON.stringify(database));
}

function userKey(username) {
    return "mpa_data_" + username;
}

function getUserData() {
    return JSON.parse(localStorage.getItem(userKey(currentUser)) || '{"completed":[],"history":[],"quizCount":0}');
}

function saveUserData(data) {
    localStorage.setItem(userKey(currentUser), JSON.stringify(data));
}

// LOGIN & REGISTER
function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

function register() {
    const name = document.getElementById("regName").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;

    if (!name || !username || !password) {
        alert("Semua kolom harus diisi!");
        return;
    }

    if (password.length < 4) {
        alert("Password minimal 4 karakter!");
        return;
    }

    const database = getDatabase();

    if (database[username]) {
        alert("Username sudah digunakan!");
        return;
    }

    database[username] = { name, password };
    saveDatabase(database);

    alert("Pendaftaran berhasil! Silakan login.");
    showLogin();
}

function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const database = getDatabase();

    if (database[username] && database[username].password === password) {
        currentUser = username;
        localStorage.setItem("mpa_session", username);
        openApp();
    } else {
        alert("Username atau password salah!");
    }
}

function logout() {
    localStorage.removeItem("mpa_session");
    currentUser = null;
    document.getElementById("appPage").classList.add("hidden");
    document.getElementById("authPage").classList.remove("hidden");
}

function openApp() {
    const database = getDatabase();
    const user = database[currentUser];

    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("appPage").classList.remove("hidden");

    document.getElementById("welcomeName").textContent = user.name;
    document.getElementById("profileName").textContent = user.name;
    document.getElementById("sideUser").textContent = user.name;

    renderLessons();
    updateDashboard();
}

// NAVIGASI
function showPage(pageId, button) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    document.getElementById(pageId).classList.remove("hidden");

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    } else {
        const matching = [...document.querySelectorAll(".nav-btn")]
            .find(btn => btn.getAttribute("onclick")?.includes("'" + pageId + "'"));
        if (matching) matching.classList.add("active");
    }

    if (pageId === "progress") updateDashboard();
}

// MATERI
function renderLessons() {
    renderLessonList(mathLessons, "mathList", "math");
    renderLessonList(programmingLessons, "programList", "programming");
}

function renderLessonList(lessons, containerId, category) {
    const container = document.getElementById(containerId);
    const data = getUserData();

    container.innerHTML = "";

    lessons.forEach((lesson, index) => {
        const id = category + "-" + index;
        const completed = data.completed.includes(id);

        const card = document.createElement("div");
        card.className = "lesson-card";

        const title = document.createElement("h3");
        title.textContent = lesson.title;

        const description = document.createElement("p");
        description.textContent = lesson.description;

        const button = document.createElement("button");
        button.textContent = completed ? "✓ Sudah Dipelajari" : "Pelajari Materi →";
        button.addEventListener("click", () => openLesson(category, index));

        card.append(title, description, button);
        container.appendChild(card);
    });
}

function openLesson(category, index) {
    const lessons = category === "math" ? mathLessons : programmingLessons;
    const lesson = lessons[index];
    const id = category + "-" + index;
    const detail = document.getElementById(category + "Detail");

    detail.classList.remove("hidden");
    detail.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = lesson.title;

    const description = document.createElement("p");
    description.textContent = lesson.content;

    const exampleTitle = document.createElement("h3");
    exampleTitle.textContent = "Contoh:";

    const example = document.createElement("pre");
    example.textContent = lesson.example;

    const completeButton = document.createElement("button");
    completeButton.textContent = "Tandai Sudah Dipelajari";
    completeButton.addEventListener("click", () => completeLesson(id));

    detail.append(title, description, exampleTitle, example, completeButton);
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function completeLesson(id) {
    const data = getUserData();

    if (!data.completed.includes(id)) {
        data.completed.push(id);
        addHistory("Menyelesaikan materi " + id);
    }

    saveUserData(data);
    renderLessons();
    updateDashboard();
    alert("Materi berhasil ditandai selesai!");
}

function addHistory(message) {
    const data = getUserData();

    data.history.unshift({
        message,
        date: new Date().toLocaleString("id-ID")
    });

    data.history = data.history.slice(0, 30);
    saveUserData(data);
}

// DASHBOARD & PROGRES
function updateDashboard() {
    const data = getUserData();
    const total = mathLessons.length + programmingLessons.length;
    const completed = data.completed.length;
    const percent = Math.round((completed / total) * 100);

    document.getElementById("totalMaterials").textContent = total;
    document.getElementById("completedCount").textContent = completed;
    document.getElementById("quizCount").textContent = data.quizCount;
    document.getElementById("progressPercent").textContent = percent + "%";

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").textContent = percent + "% Selesai";
    document.getElementById("progressDescription").textContent =
        completed + " dari " + total + " materi telah diselesaikan.";

    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    if (data.history.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Belum ada aktivitas belajar.";
        historyList.appendChild(li);
    } else {
        data.history.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.date + " — " + item.message;
            historyList.appendChild(li);
        });
    }
}

// CODE PLAYGROUND
function runCode() {
    const code = document.getElementById("codeEditor").value;
    const output = document.getElementById("codeOutput");

    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.display = "none";

    const safeCode = JSON.stringify(code);

    iframe.srcdoc = `
        <script>
        const logs = [];
        console.log = (...args) => logs.push(args.map(x =>
            typeof x === "object" ? JSON.stringify(x) : String(x)
        ).join(" "));

        console.error = (...args) => logs.push("ERROR: " + args.join(" "));
        console.warn = (...args) => logs.push("WARNING: " + args.join(" "));

        try {
            new Function(${safeCode})();
        } catch(error) {
            logs.push("ERROR: " + error.message);
        }

        parent.postMessage({
            type: "mpa-output",
            output: logs.join("\\\\n") || "Program berhasil dijalankan (tidak ada output)."
        }, "*");
        <\/script>
    `;

    const handler = event => {
        if (event.source !== iframe.contentWindow) return;
        if (event.data?.type !== "mpa-output") return;

        output.textContent = event.data.output;
        window.removeEventListener("message", handler);
        iframe.remove();
    };

    window.addEventListener("message", handler);
    document.body.appendChild(iframe);

    setTimeout(() => {
        if (iframe.isConnected) {
            window.removeEventListener("message", handler);
            iframe.remove();
            output.textContent = "Waktu eksekusi habis atau program tidak memberikan respons.";
        }
    }, 3000);
}

// KUIS
const questions = [
    {
        question: "Berapakah hasil dari 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: 2
    },
    {
        question: "Turunan dari f(x) = x² adalah?",
        options: ["x", "2x", "x²", "2"],
        answer: 1
    },
    {
        question: "Bahasa pemrograman yang menggunakan perintah print() adalah?",
        options: ["Python", "HTML", "CSS", "SQL"],
        answer: 0
    },
    {
        question: "Apa fungsi dari HTML?",
        options: [
            "Mengatur database",
            "Membuat struktur halaman web",
            "Mengatur jaringan",
            "Mengedit gambar"
        ],
        answer: 1
    },
    {
        question: "Apa fungsi dari perulangan for?",
        options: [
            "Menghapus data",
            "Membuat variabel",
            "Mengulang perintah",
            "Menghentikan komputer"
        ],
        answer: 2
    }
];

let questionIndex = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;

    const q = questions[questionIndex];

    document.getElementById("questionNumber").textContent =
        "Soal " + (questionIndex + 1) + " / " + questions.length;

    document.getElementById("quizScore").textContent = "Skor: " + score;
    document.getElementById("questionText").textContent = q.question;
    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("nextQuestion").disabled = true;
    document.getElementById("nextQuestion").textContent =
        questionIndex === questions.length - 1 ? "Lihat Hasil" : "Soal Berikutnya →";

    const options = document.getElementById("answerOptions");
    options.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(index));
        options.appendChild(button);
    });
}

function checkAnswer(index) {
    if (answered) return;
    answered = true;

    const q = questions[questionIndex];
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((button, i) => {
        button.disabled = true;
        if (i === q.answer) button.classList.add("correct");
        if (i === index && index !== q.answer) button.classList.add("wrong");
    });

    if (index === q.answer) {
        score += 20;
        document.getElementById("quizFeedback").textContent = "✓ Jawaban benar!";
        document.getElementById("quizFeedback").style.color = "#4ade80";
    } else {
        document.getElementById("quizFeedback").textContent =
            "✗ Jawaban salah. Jawaban yang benar: " + q.options[q.answer];
        document.getElementById("quizFeedback").style.color = "#f87171";
    }

    document.getElementById("quizScore").textContent = "Skor: " + score;
    document.getElementById("nextQuestion").disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    if (questionIndex < questions.length - 1) {
        questionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const data = getUserData();
    data.quizCount++;
    addHistory("Menyelesaikan kuis dengan skor " + score);
    saveUserData(data);

    document.getElementById("questionText").textContent =
        "Kuis selesai! Skor kamu: " + score + " / 100";

    document.getElementById("answerOptions").innerHTML = "";
    document.getElementById("quizFeedback").textContent =
        score >= 80 ? "Hebat! Pertahankan prestasimu." : "Tetap semangat, terus belajar!";
    document.getElementById("nextQuestion").textContent = "Ulangi Kuis";
    document.getElementById("nextQuestion").disabled = false;
    document.getElementById("nextQuestion").onclick = restartQuiz;

    updateDashboard();
}

function restartQuiz() {
    questionIndex = 0;
    score = 0;
    document.getElementById("nextQuestion").onclick = nextQuestion;
    loadQuestion();
}

// KALKULATOR
function appendCalc(value) {
    const display = document.getElementById("calcDisplay");
    const current = display.value;

    if (current === "Error") {
        display.value = value;
    } else if (current === "0" && /[0-9.]/.test(value)) {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearCalc() {
    document.getElementById("calcDisplay").value = "0";
}

function deleteCalc() {
    const display = document.getElementById("calcDisplay");
    display.value = display.value.length > 1
        ? display.value.slice(0, -1)
        : "0";
}

function calculate() {
    const display = document.getElementById("calcDisplay");
    const expression = display.value;

    // Hanya menerima angka dan operator matematika.
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        const result = Function('"use strict"; return (' + expression + ')')();

        display.value = Number.isFinite(result)
            ? String(Number(result.toFixed(10)))
            : "Error";
    } catch {
        display.value = "Error";
    }
}

// MULAI APLIKASI
document.addEventListener("DOMContentLoaded", () => {
    const session = localStorage.getItem("mpa_session");
    const database = getDatabase();

    if (session && database[session]) {
        currentUser = session;
        openApp();
    }

    loadQuestion();
});

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // Dynamic placeholders for Teachers
    const teachersGrid = document.getElementById('teachers-grid');
    const teacherModal = document.getElementById('teacher-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');

    // Ensure we don't start duplicating if this script runs twice (though it shouldn't)
    if (teachersGrid && teachersGrid.children.length === 0) {
        const teachersData = [
            {
                name: "Georgekutty M V",
                subject: "Head Master",
                desc: "Headmaster of the School",
                contact: "+91 94472 05828",
                photo: "assets/teachers/georgekutty_mv_new.png"
            },
            {
                name: "Kochurani Joseph",
                subject: "Senior Faculty & English Teacher",
                desc: "Senior Faculty in HS",
                contact: "+91 98467 57303",
                photo: "assets/teachers/kochurani_joseph.jpg"
            },
            {
                name: "Shiny Mathew",
                subject: "Chemistry/Physics Teacher",
                desc: "High School Teacher",
                contact: "+91 94461 29307",
                photo: "assets/teachers/shiny_mathew_new.png"
            },
            {
                name: "Manju K M",
                subject: "IT Teacher",
                desc: "High School IT Faculty",
                contact: "+91 79023 10370",
                photo: "assets/teachers/manju_km_new.png"
            },
            {
                name: "Eby T James",
                subject: "English Teacher",
                desc: "Upper Primary English Faculty",
                contact: "+91 97463 64727",
                photo: "assets/teachers/eby_t_james.jpg"
            },
            // Placeholders
            { placeholder: true },
            { placeholder: true },
            { placeholder: true }
        ];

        teachersData.forEach(t => {
            const card = document.createElement('div');
            card.className = 'teacher-summary-card';

            if (t.placeholder) {
                card.innerHTML = `
                    <h3> ... </h3>
                    <p><strong>Faculty Pending</strong></p>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #888;">Click for details</p>
                `;
            } else {
                card.innerHTML = `
                    <h3>${t.name}</h3>
                    <p><strong>${t.subject}</strong></p>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #888;">Click for details</p>
                `;
            }

            // Hover logic with safety check
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                card.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                card.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
            }

            // Click to Open Modal - Using simple click handler
            card.onclick = function () {
                if (t.placeholder) {
                    openPlaceholderModal();
                } else {
                    openTeacherModal(t);
                }
            };

            teachersGrid.appendChild(card);
        });
    }

    // Open Modal Function
    function openTeacherModal(teacher) {
        if (!teacherModal || !modalBody) return;

        // Photo HTML: use img tag if photo exists, else keep placeholder div
        let photoHTML = `
            <div class="teacher-photo-placeholder">
                Photo Upload
            </div>`;

        if (teacher.photo) {
            photoHTML = `
                <img src="${teacher.photo}" alt="${teacher.name}" class="teacher-photo-placeholder" style="object-fit: cover; border: none; padding: 0;">
            `;
        }

        modalBody.innerHTML = `
            <div class="teacher-card">
                ${photoHTML}
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                </div>
                <div class="teacher-details">
                    <p><strong>${teacher.subject}</strong></p>
                    <p>${teacher.desc}</p>
                </div>
                <div class="teacher-contact">
                    <p>Phone: ${teacher.contact}</p>
                    <p>Email: contact@stthomashss.edu</p>
                </div>
            </div>
        `;

        teacherModal.classList.remove('hidden');
    }

    function openPlaceholderModal() {
        if (!teacherModal || !modalBody) return;
        modalBody.innerHTML = `
            <div class="teacher-card">
                <div class="teacher-photo-placeholder">
                    ?
                </div>
                <div class="teacher-info">
                    <h3>Coming Soon</h3>
                </div>
                <div class="teacher-details">
                    <p>This faculty member's details will be uploaded shortly.</p>
                </div>
            </div>
        `;
        teacherModal.classList.remove('hidden');
    }

    // Close Modal Functions
    if (closeModalBtn) {
        closeModalBtn.onclick = function () {
            teacherModal.classList.add('hidden');
        };
    }

    // Close when clicking outside
    if (teacherModal) {
        teacherModal.onclick = function (e) {
            if (e.target === teacherModal) {
                teacherModal.classList.add('hidden');
            }
        };
    }

    /* =========================================
       TEXTBOOKS PAGE LOGIC
       ========================================= */
    const classGrid = document.getElementById('class-grid');
    if (classGrid) {
        for (let i = 1; i <= 10; i++) {
            const card = document.createElement('div');
            card.className = 'card glass-blue';
            card.style.cursor = 'pointer';
            card.style.textAlign = 'center';
            card.innerHTML = `
                <h3 style="font-size: 2rem; color: var(--primary-blue); margin-bottom: 0.5rem;">Class ${i}</h3>
                <p>View Textbooks for Class ${i}</p>
            `;
            // Hover
            card.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            card.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));

            // Navigate
            card.onclick = function () {
                window.location.href = `textbook-view.html?class=${i}`;
            };

            classGrid.appendChild(card);
        }
    }

    /* =========================================
       TEXTBOOK VIEW PAGE LOGIC
       ========================================= */
    const subjectGrid = document.getElementById('subject-grid');
    const classTitle = document.getElementById('class-title');
    const unavailableMsg = document.getElementById('unavailable-msg');

    if (subjectGrid && classTitle) {
        // Get URL Param
        const urlParams = new URLSearchParams(window.location.search);
        const classNum = urlParams.get('class');

        if (classNum) {
            classTitle.textContent = `Class ${classNum} Textbooks`;

            if (classNum === '9') {
                // Render Class 9 Subjects
                const subjects = [
                    { name: "Malayalam 1", link: "https://drive.google.com/file/d/1-NsrMK0oBO0zmFnL624syp9BHP2iv3RP/view" },
                    { name: "Malayalam 2", link: "https://drive.google.com/file/d/1-VMhwk_54xsuyl8cp8d2eLceJXFYrxOt/view" },
                    { name: "English", link: "https://drive.google.com/file/d/100LVDNWqztwITwh0VKBZ5P78_cUuQa7Z/view" },
                    { name: "Hindi", link: "https://drive.google.com/file/d/1-wXMTfnsnctXDUCBX6Dr6jBr4j-3HfWA/view" },
                    { name: "Physics", link: "https://drive.google.com/file/d/10jHUsdeEQcRn01LZjJsjr2IjqoVrL1Wo/view" },
                    { name: "Chemistry", link: "https://drive.google.com/file/d/11CmzfKQuh5I5dZ5dTlHCyreZ6foa0WUk/view" },
                    { name: "Biology", link: "https://drive.google.com/file/d/11TVOnZfosRVpoGKydfT2xEJLc8htGkD1/view" },
                    { name: "Social Science 1", link: "https://drive.google.com/file/d/11xfpG8-QPNKC6Sc84OmNBkFoT7j7VuQl/view" },
                    { name: "Social Science 2", link: "https://drive.google.com/file/d/12HoSatVLSCoYLRSFo0jvJ9V2OFgYjRV0/view" },
                    { name: "Maths", link: "https://drive.google.com/file/d/12TohCsmGTL0DXmLT7CgFUHsuyLrYq7Nt/view" },
                    { name: "IT", link: "https://drive.google.com/file/d/16z94Gux74vYWTGSLlSrK5jI7fVpO9AjR/view" }
                ];

                subjects.forEach(sub => {
                    const card = document.createElement('div');
                    card.className = 'card glass-blue';
                    card.style.textAlign = 'center';
                    card.innerHTML = `
                        <h3>${sub.name}</h3>
                        <a href="${sub.link}" target="_blank" class="btn-text">Download / View</a>
                    `;
                    card.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                    card.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
                    subjectGrid.appendChild(card);
                });

            } else {
                // Show "Not Available" for non-9 classes
                unavailableMsg.classList.remove('hidden');
            }
        }
    }
});

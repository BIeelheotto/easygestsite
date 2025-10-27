document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (typeof GLightbox !== "undefined") {
        GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
        });
    }

    const mainContent = document.getElementById("main-content");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const authForm = document.getElementById("authForm");
    const swapText = document.getElementById("swapText");
    const swapLink = document.getElementById("swapLink");
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");
    const closeModalButton = document.querySelector(".close");

    let isLoginMode = true;
    let lastFocusedElement; // To store the element that opened the modal

    function openModal(mode = "login", plan = "") {
        lastFocusedElement = document.activeElement; // Save focus
        isLoginMode = (mode === "login");
        updateModalUI();
        if (plan) {
            // console.log(`Plano selecionado: ${plan}`);
        }
        if (modal && mainContent) {
            modal.style.display = "grid";
            modal.setAttribute("aria-hidden", "false");
            mainContent.setAttribute("aria-hidden", "true");

            modal.addEventListener('keydown', handleModalKeyDown);

            const focusableElements = modal.querySelectorAll('button, [href], input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
            const firstFocusableElement = focusableElements[0];
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }
    }

    function closeModal() {
        if (modal && mainContent) {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            mainContent.setAttribute("aria-hidden", "false");
            modal.removeEventListener('keydown', handleModalKeyDown);
        }
        if (lastFocusedElement) {
            lastFocusedElement.focus(); // Restore focus
        }
    }

    function handleModalKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll('button, [href], input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        }
    }

    function swapMode(event) {
        event.preventDefault();
        isLoginMode = !isLoginMode;
        updateModalUI();
    }

    function updateModalUI() {
        if (modalTitle && authForm && swapText && swapLink) {
            if (isLoginMode) {
                modalTitle.textContent = "Entrar";
                authForm.querySelector('button[type="submit"]').textContent = "Entrar";
                swapText.textContent = "Ainda não tem conta?";
                swapLink.textContent = "Crie agora";
            } else {
                modalTitle.textContent = "Criar conta grátis";
                authForm.querySelector('button[type="submit"]').textContent = "Criar conta";
                swapText.textContent = "Já tem uma conta?";
                swapLink.textContent = "Faça login";
            }
        }
    }

    function handleAuth(event) {
        event.preventDefault();
        const email = authForm.querySelector('input[type="email"]').value;
        alert(`${isLoginMode ? "Login" : "Cadastro"} com o e-mail: ${email}`);
        closeModal();
    }

    document.querySelectorAll("[data-modal-mode]").forEach(button => {
        button.addEventListener("click", () => {
            const mode = button.getAttribute("data-modal-mode");
            const plan = button.getAttribute("data-plan");
            openModal(mode, plan);
        });
    });

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeModal);
    }

    if (swapLink) {
        swapLink.addEventListener("click", swapMode);
    }

    if (authForm) {
        authForm.addEventListener("submit", handleAuth);
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

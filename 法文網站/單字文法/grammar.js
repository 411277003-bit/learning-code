// ==========================================
// 文法區塊 - 摺疊面板初始化
// ==========================================
function initAccordions(containerId) {
    const container = containerId ? document.getElementById(containerId) : document;
    if (!container) return;

    const acc = container.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].removeEventListener("click", toggleAccordion);
        acc[i].addEventListener("click", toggleAccordion);
    }
}

function toggleAccordion() {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

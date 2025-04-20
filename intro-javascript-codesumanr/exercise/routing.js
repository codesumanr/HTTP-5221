document.addEventListener("DOMContentLoaded", function () {
    const pageTitle = document.getElementById("page-title");
    const content = document.getElementById("content");
    const contentWrapper = document.getElementById("content-wrapper");

    const pageData = {
        "home-link": { title: "Home Page", content: "<p>Content related to Home page</p>", bgColor: "#ffffff" },
        "products-link": { title: "Products Page", content: "<p>Content related to Products page</p>", bgColor: "#faedcd" },
        "about-link": { title: "About Us Page", content: "<p>Content related to About Us page</p>", bgColor: "#ccd5ae" }
    };

    document.getElementById("nav").addEventListener("click", function (event) {
        const linkId = event.target.id;
        if (pageData[linkId]) {
            pageTitle.textContent = pageData[linkId].title;
            content.innerHTML = pageData[linkId].content;
            contentWrapper.style.backgroundColor = pageData[linkId].bgColor;
        }
    });
});

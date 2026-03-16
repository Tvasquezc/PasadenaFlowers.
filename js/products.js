document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     READ PRODUCT FROM URL
  ========================= */
  const params = new URLSearchParams(window.location.search);
  const rawKey = params.get("product") || "classic-blue";
  const productKey = rawKey.trim().toLowerCase();

  /* =========================
     PRODUCTS DATA
  ========================= */
  const products = {
    "classic-purple": {
      titleKey: "product_classic_purple_title",
      image: "../../images/classic-purple.png",
      specs: {
        length: "60 cm",
        bloom: "6 cm",
        aperture: "25%",
        foliage: "4 pairs"
      }
    },
    "classic-white": {
      titleKey: "product_classic_white_title",
      image: "../../images/classic-white.png",
      specs: {
        length: "60 cm",
        bloom: "6 cm",
        aperture: "24%",
        foliage: "4 pairs"
      }
    },
    "classic-blue": {
      titleKey: "product_classic_blue_title",
      image: "../../images/classic-blue.jpg",
      specs: {
        length: "62 cm",
        bloom: "6.2 cm",
        aperture: "28%",
        foliage: "5 pairs"
      }
    },
    "classic-green": {
      titleKey: "product_classic_green_title",
      image: "../../images/classic-green.png",
      specs: {
        length: "59 cm",
        bloom: "5.8 cm",
        aperture: "23%",
        foliage: "4 pairs"
      }
    }
  };

  /* =========================
     LOAD MAIN PRODUCT
  ========================= */
  const product = products[productKey];
  if (!product) return;

  /* =========================
     PRODUCT TITLE (i18n + fallback)
  ========================= */
  const titleEl = document.getElementById("productTitle");

  if (titleEl) {
    titleEl.setAttribute("data-i18n", product.titleKey);

    // fallback inmediato
    titleEl.textContent = productKey
      .replace("classic-", "")
      .replace("-", " ")
      .toUpperCase();
  }
setLanguage(localStorage.getItem("lang") || "es");

  /* =========================
     MAIN IMAGE & SPECS
  ========================= */
  document.getElementById("mainImage").src = product.image;
  document.getElementById("length").textContent = product.specs.length;
  document.getElementById("bloom").textContent = product.specs.bloom;
  document.getElementById("aperture").textContent = product.specs.aperture;
  document.getElementById("foliage").textContent = product.specs.foliage;

  /* =========================
     RELATED PRODUCTS GRID
  ========================= */
  const relatedGrid = document.getElementById("relatedGrid");

  if (relatedGrid) {
    for (const key in products) {
      if (key === productKey) continue;

      const link = document.createElement("a");
      link.href = `?product=${key}`;
      link.className = "product-link";

      link.innerHTML = `
        <div class="color-card">
          <img src="${products[key].image}" alt="">
          <h3>${key.replace("classic-", "").replace("-", " ").toUpperCase()}</h3>
          <div class="see-more" data-i18n="see_more">SEE MORE</div>
        </div>
      `;

      relatedGrid.appendChild(link);
    }
  }

  /* =========================
     APPLY TRANSLATIONS (ONCE)
  ========================= */
  if (typeof applyTranslations === "function") {
    applyTranslations();
  }

});

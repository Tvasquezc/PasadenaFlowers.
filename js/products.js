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

    "classic-white": {
      titleKey: "product_classic_white_title",
      variants: {

        mini: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "9-12 cm", aperture: "30%" }
        },

        select: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "16-17 cm", aperture: "80-90%"}
        },

        super: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "17-18 cm", aperture: "80-90%" }
        },

        premium: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "18-20 cm", aperture: "80-90%" }
        },

        jumbo: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "> 20 cm", aperture: "95%" }
        }

      }
    },


    "classic-green": {
      titleKey: "product_classic_green_title",
      variants: {

        select: {
          image: "../../images/classic-green.png",
          specs: { length: "60 cm", bloom: "16-18 cm", aperture: "80-90%" }
        },

        premium: {
          image: "../../images/classic-green.png",
          specs: { length: "60 cm", bloom: "18-20 cm", aperture: "80-90%" }
        }

      }
    },


    "classic-purple": {
      titleKey: "product_classic_purple_title",
      variants: {

        select: {
          image: "../../images/classic-purple.png",
          specs: { length: "60 cm", bloom: "16-18 cm", aperture: "80-90%" }
        },

        premium: {
          image: "../../images/classic-purple.png",
          specs: { length: "60 cm", bloom: "18-20  cm", aperture: "80-90%" }
        }

      }
    },


    "classic-blue": {
      titleKey: "product_classic_blue_title",
      variants: {

        select: {
          image: "../../images/classic-blue.jpg",
          specs: { length: "60 cm", bloom: "16-18 cm", aperture: "80-90%" }
        },

        premium: {
          image: "../../images/classic-blue.jpg",
          specs: { length: "60 cm", bloom: "18-20 cm", aperture: "80-90%"}
        }

      }
    }

  };


  /* =========================
     LOAD PRODUCT
  ========================= */
  const product = products[productKey];
  if (!product) return;


  /* =========================
     PRODUCT TITLE
  ========================= */
  const titleEl = document.getElementById("productTitle");

  if (titleEl) {

    titleEl.setAttribute("data-i18n", product.titleKey);

    titleEl.textContent = productKey
      .replace("classic-", "")
      .replace("-", " ")
      .toUpperCase();
  }

  setLanguage(localStorage.getItem("lang") || "es");


  /* =========================
     VARIANT SELECTOR
  ========================= */
  const selector = document.querySelector(".product-selector");
  selector.innerHTML = "";

  const variants = Object.keys(product.variants);

  variants.forEach((variant, index) => {

    const btn = document.createElement("button");

    btn.dataset.variant = variant;
    btn.setAttribute("data-i18n", "variant_" + variant);

    btn.textContent = variant.toUpperCase();

    selector.appendChild(btn);

    btn.addEventListener("click", () => {
      loadVariant(variant);
    });

    if (index === 0) {
      loadVariant(variant);
      btn.classList.add("active");
    }

  });


  /* =========================
     LOAD VARIANT DATA
  ========================= */
  function loadVariant(variant) {

    const data = product.variants[variant];

    document.getElementById("mainImage").src = data.image;

    document.getElementById("length").textContent = data.specs.length;
    document.getElementById("bloom").textContent = data.specs.bloom;
    document.getElementById("aperture").textContent = data.specs.aperture;

    document.querySelectorAll(".product-selector button")
      .forEach(btn => btn.classList.remove("active"));

    const activeBtn = document.querySelector(`[data-variant="${variant}"]`);
    if (activeBtn) activeBtn.classList.add("active");

  }


  /* =========================
     RELATED PRODUCTS
  ========================= */
  const relatedGrid = document.getElementById("relatedGrid");

  if (relatedGrid) {

    for (const key in products) {

      if (key === productKey) continue;

      const firstVariant = Object.values(products[key].variants)[0];

      const link = document.createElement("a");
      link.href = `?product=${key}`;
      link.className = "product-link";

      link.innerHTML = `
        <div class="color-card">
          <img src="${firstVariant.image}" alt="">
          <h3>${key.replace("classic-", "").replace("-", " ").toUpperCase()}</h3>
          <div class="see-more" data-i18n="see_more">SEE MORE</div>
        </div>
      `;

      relatedGrid.appendChild(link);
    }

  }


  /* =========================
     APPLY TRANSLATIONS
  ========================= */
  if (typeof applyTranslations === "function") {
    applyTranslations();
  }

});

document.querySelector(".contact-btn").addEventListener("click", () => {
  window.location.href = "mailto:pasadenaflowerssas@gmail.com";
});
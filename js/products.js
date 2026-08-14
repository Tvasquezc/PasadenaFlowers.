document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productKey = (params.get("product") || "classic-blue")
    .trim()
    .toLowerCase();

  const immersionColors = [
    { key: "pink", hex: "#e86a9f" },
    { key: "light-pink", hex: "#f4c4d6" },
    { key: "orange", hex: "#ed7d31" },
    { key: "light-orange", hex: "#f7c58b" },
    { key: "burgundy", hex: "#800020" },
    { key: "deep-blue", hex: "#1746a2" },
    { key: "peach", hex: "#f3a683" },
    { key: "light-peach", hex: "#f9d5c2" },
    { key: "yellow", hex: "#f4d35e" },
    { key: "lavender", hex: "#b9a0dc" }
  ];

  const sprayColors = [
    { key: "red", hex: "#800020" }
  ];

  function buildTintedImages(method, colors) {
    return Object.fromEntries(
      colors.map(color => [
        color.key,
        `../../images/tinturadas/${method}/${color.key}.png`
      ])
    );
  }

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
          specs: { length: "60 cm", bloom: "16-17 cm", aperture: "80-90%" }
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
          specs: { length: "60 cm", bloom: "18-20 cm", aperture: "80-90%" }
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
          specs: { length: "60 cm", bloom: "18-20 cm", aperture: "80-90%" }
        }
      }
    },

    "tinted-immersion": {
      titleKey: "product_tinted_immersion_title",
      colorOptions: immersionColors,
      colors: buildTintedImages("inmersion", immersionColors),

      variants: {
        mini: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "9-12 cm", aperture: "30%" }
        },
        select: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "16-17 cm", aperture: "80-90%" }
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

    "tinted-spray": {
      titleKey: "product_tinted_spray_title",
      colorOptions: sprayColors,
      colors: buildTintedImages("aspersion", sprayColors),

      variants: {
        mini: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "9-12 cm", aperture: "30%" }
        },
        select: {
          image: "../../images/classic-white.png",
          specs: { length: "60 cm", bloom: "16-17 cm", aperture: "80-90%" }
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
    }
  };

  const product = products[productKey];
  if (!product) return;

  const titleEl = document.getElementById("productTitle");
  const selector = document.querySelector(".product-selector");
  const mainImage = document.getElementById("mainImage");
  const colorSpec = document.getElementById("colorSpec");
  const colorOptions = document.getElementById("colorOptions");
  const selectedColorName = document.getElementById("selectedColorName");

  if (!selector || !mainImage) return;

  let selectedVariant = Object.keys(product.variants)[0];
  let selectedColor = product.colors ? Object.keys(product.colors)[0] : null;

  if (titleEl) {
    titleEl.setAttribute("data-i18n", product.titleKey);
    titleEl.textContent = productKey.replaceAll("-", " ").toUpperCase();
  }

  function currentLanguage() {
    return localStorage.getItem("lang") || "es";
  }

  function translation(key, fallback) {
    const lang = currentLanguage();
    return typeof translations !== "undefined" && translations[lang]?.[key]
      ? translations[lang][key]
      : fallback;
  }

  function updateMainImage() {
    const variant = product.variants[selectedVariant];
    const source = product.colors
      ? product.colors[selectedColor]
      : variant.image;

    mainImage.src = source;
    mainImage.alt = translation(
      product.titleKey,
      productKey.replaceAll("-", " ")
    );
  }

  function loadVariant(variantKey) {
    selectedVariant = variantKey;
    const data = product.variants[variantKey];

    document.getElementById("length").textContent = data.specs.length;
    document.getElementById("bloom").textContent = data.specs.bloom;
    document.getElementById("aperture").textContent = data.specs.aperture;

    selector.querySelectorAll("button").forEach(button => {
      button.classList.toggle("active", button.dataset.variant === variantKey);
    });

    updateMainImage();
  }

  function getColorLabel(colorKey) {
    const labelKey = `color_${colorKey.replaceAll("-", "_")}`;
    return translation(labelKey, colorKey.replaceAll("-", " "));
  }

  function updateColorTranslations() {
    if (!product.colorOptions || !colorOptions) return;

    colorOptions.querySelectorAll(".color-swatch").forEach(button => {
      const label = getColorLabel(button.dataset.color);
      button.setAttribute("aria-label", label);
      button.title = label;
    });

    if (selectedColor && selectedColorName) {
      selectedColorName.textContent = getColorLabel(selectedColor);
    }
  }

  function loadColor(colorKey) {
    if (!product.colors?.[colorKey] || !colorOptions) return;

    selectedColor = colorKey;

    colorOptions.querySelectorAll(".color-swatch").forEach(button => {
      const isSelected = button.dataset.color === colorKey;
      button.classList.toggle("active", isSelected);
      button.setAttribute("aria-checked", String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });

    updateColorTranslations();
    updateMainImage();
  }

  selector.innerHTML = "";
  Object.keys(product.variants).forEach(variantKey => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.variant = variantKey;
    button.setAttribute("data-i18n", `variant_${variantKey}`);
    button.textContent = variantKey.toUpperCase();
    button.addEventListener("click", () => loadVariant(variantKey));
    selector.appendChild(button);
  });

  if (product.colors && product.colorOptions && colorSpec && colorOptions) {
    colorSpec.hidden = false;
    colorOptions.innerHTML = "";

    product.colorOptions.forEach(color => {
      const label = getColorLabel(color.key);
      const button = document.createElement("button");

      button.type = "button";
      button.className = "color-swatch";
      button.dataset.color = color.key;
      button.style.setProperty("--swatch-color", color.hex);
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", "false");
      button.setAttribute("aria-label", label);
      button.title = label;
      button.tabIndex = -1;
      button.addEventListener("click", () => loadColor(color.key));

      colorOptions.appendChild(button);
    });
  } else if (colorSpec) {
    colorSpec.hidden = true;
  }

  loadVariant(selectedVariant);
  if (selectedColor) loadColor(selectedColor);

  if (typeof setLanguage === "function") {
    setLanguage(currentLanguage());
  }

  updateColorTranslations();

  window.addEventListener("languagechange", updateColorTranslations);

  document.querySelectorAll("#langDropdown [data-lang]").forEach(item => {
    item.addEventListener("click", () => {
      window.setTimeout(updateColorTranslations, 0);
    });
  });

  const relatedGrid = document.getElementById("relatedGrid");
  if (relatedGrid) {
    Object.entries(products).forEach(([key, relatedProduct]) => {
      if (key === productKey) return;

      const firstVariant = Object.values(relatedProduct.variants)[0];
      const firstImage = relatedProduct.colors
        ? Object.values(relatedProduct.colors)[0]
        : firstVariant.image;

      const link = document.createElement("a");
      link.href = `?product=${key}`;
      link.className = "product-link";
      link.innerHTML = `
        <div class="color-card">
          <img src="${firstImage}" alt="">
          <h3 data-i18n="${relatedProduct.titleKey}">${key.replaceAll("-", " ").toUpperCase()}</h3>
          <div class="see-more" data-i18n="see_more">SEE MORE</div>
        </div>
      `;
      relatedGrid.appendChild(link);
    });
  }

  if (typeof setLanguage === "function") {
    setLanguage(currentLanguage());
  }
});

const contactButton = document.querySelector(".contact-btn");
if (contactButton) {
  contactButton.addEventListener("click", () => {
    window.location.href = "mailto:pasadenaflowerssas@gmail.com";
  });
}

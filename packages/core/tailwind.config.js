const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px"
    },
    colors: {
      background: {
        "01": "var(--background-01)",
        "02": "var(--background-02)",
        "03": "var(--background-03)",
        "04": "var(--background-04)",
        "05": "var(--background-05)",
        "06": "var(--background-06)"
      },
      primary: {
        default: "var(--primary)",
        dark: "var(--primary-dark)",
        90: "var(--primary-90)",
        80: "var(--primary-80)",
        70: "var(--primary-70)",
        60: "var(--primary-60)",
        50: "var(--primary-50)",
        40: "var(--primary-40)",
        30: "var(--primary-30)",
        20: "var(--primary-20)",
        10: "var(--primary-10)"
      },
      secondary: {
        default: "var(--secondary)",
        dark: "var(--secondary-dark)",
        90: "var(--secondary-90)",
        80: "var(--secondary-80)",
        70: "var(--secondary-70)",
        60: "var(--secondary-60)",
        50: "var(--secondary-50)",
        40: "var(--secondary-40)",
        30: "var(--secondary-30)",
        20: "var(--secondary-20)",
        10: "var(--secondary-10)"
      },
      success: "var(--success)",
      error: "var(--error)",
      alert: "var(--alert)",
      "color-text": {
        "01": "var(--color-text-01)",
        "02": "var(--color-text-02)",
        "03": "var(--color-text-03)"
      },
      field: "var(--field)",
      disabled: {
        background: "var(--disabled-background)",
        text: "var(--disabled-text)"
      },
      focus: "var(--focus)"
    },
    spacing: {
      xsm: "0.4rem",
      sm: "0.8rem",
      md: "1.2rem",
      lg: "1.6rem",
      xlg: "2rem",
      xxlg: "2.4rem"
    },
    borderRadius: {
      sm: "0.4rem",
      default: "0.8rem",
      lg: "2.4rem",
      full: "9999px"
    },
    fontFamily: {
      sans: ["Lato", ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      "heading-01": "2.4rem",
      "heading-02": "2rem",
      "subheading-01": "1.8rem",
      "subheading-02": "1.6rem",
      body: "1.4rem",
      "body-02": "1.6rem",
      "small-01": "1.1rem",
      "small-02": "1.2rem",
      "small-03": "1rem",
      "display-01": "4.8rem",
      "display-02": "4rem"
    },
    fontWeight: {
      light: "300",
      regular: "400",
      bold: "700",
      black: "900"
    }
  }
};

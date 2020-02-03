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
      interactive: {
        "01": "var(--interactive-01)",
        "02": "var(--interactive-02)"
      },
      support: {
        success: "var(--support-success)",
        error: "var(--support-error)",
        alert: "var(--support-alert)"
      },
      "color-text": {
        "01": "var(--text-01)",
        "02": "var(--text-02)",
        "03": "var(--text-03)"
      },
      link: {
        "01": "var(--link-01)"
      },
      field: "var(--field)",
      disabled: {
        background: "var(--disabled-background)",
        text: "var(--disabled-text)"
      },
      focus: "var(--focus)",
      hover: {
        "interactive-01": "var(--hover-interactive-01)",
        "link-01": "var(--hover-primary-link)",
        "interactive-02": "var(--hover-secondary)"
      }
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
      lg: "2.4rem"
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

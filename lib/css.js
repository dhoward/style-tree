const style = {
  firstClass: {
    height: 100,
    lineHeight: 2,
    width: 200,

    $firstClassModifier: {
      height: "777px",

      thingInsideIt: {
        color: "babyblue",
        MozBorderRadius: 3,
        transition: "all 2s"
      }
    },

    ":hover": {
      color: "hovercolor"
    },

    secondClass: {
      color: "red",
      textAlign: "center",

      insideSecondClass: {
        background: "green"
      },

      "@media (max-width: 300px)": {
        padding: 10,
        margin: 20
      }
    },

    "@media (max-width: 600px)": {
      fontSize: 8,
      fontWeight: "bold"
    }
  }
};

export default style;
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

      "@media (max-width: 300px)": {
        padding: 10,
        margin: 20
      }
    }
  }
};

export default style;
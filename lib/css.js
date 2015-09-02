const style = {
  firstClass: {
    height: "100px",
    width: "200px",

    $firstClassModifier: {
      height: "777px",

      thingInsideIt: {
        color: "babyblue"
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
    },

    "@media (max-width: 600px)": {
      fontSize: 8,
      fontWeight: "bold"
    }
  }
};

export default style;
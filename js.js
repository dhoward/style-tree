var style = {
  firstClass: {
    height: "100px",
    width: "200px",

    secondClass: {
      color: "red",
      textAlign: "center"
    }
  }
};

console.log(style);

styles = "";

for (var property in style) {
    console.log(property+"{");

    if (style.hasOwnProperty(property)) {
        console.log(property);
        // console.log(style[property]);

        if(typeof style[property] !== "object") {
          styles += property+":"+style[property]+";";
        }
    }

    console.log("}");
}

console.log(styles);
# StyleTree

Write your styles in JSON while retaining all the advantages of handwritten css.

##Usage

To create a style, pass a JSON object into createStyles:

```
import StyleTree from "style-tree";

const styles = StyleTree.createStyles({
  someClass: {
    height: 100,
    width: 200
  }
};
```

When you want to output css, call renderStyles:
```
StyleTree.renderStyles() //.sLEHb { height:100px;width:200px; }
```

Notice that StyleTree generates a hashed value of the class name for you. To use it in your html, access it as you would in the object that you originally created:
```
<div class={styles.firstClass}></div> //<div class="sLEHb"></div>
```

###Nested classes

StyleTree also supports nested classes. For example this JSON:
```
StyleTree.createStyles({
  outerClass: {
    height: 100,
    width: 200,
    
    innerClass: {
      backgroundColor: "green",
      color: "red"
    }
  }
};
```
Outputs this css:
```
.sLEHb { height:100px;width:200px; }
.sLEHb .Z1glYGA { backgroundColor:"green";color:"red" }
```
You can nest as far as you want, and access the classes in your html the same as before:
```
<div class={styles.outerClass.innerClass}></div> //<div class="Z1glYGA"></div>
```

###Pseudo selectors
```
StyleTree.createStyles({
  someClass: {
    height: 100,
    
    ":hover": {
      height: 200
    }
  }
};

.sLEHb { height:100px; }
.sLEHb:hover { height:200px }
```

###Media queries

Should be nested inside the element they are to affect:
```
StyleTree.createStyles({
  someClass: {
    height: 100,
    
    "@media (max-width: 300px)": {
      height: 200
    }
  }
};

.sLEHb { height:100px; }
@media (max-width: 300px) { .sLEHb { height:200px } }
```

##Utility properties
For whatever reason, you may want to use the human-readable names you created for your css classes. To do that grab the `readable` property from the class:
```
style.someClass.readable // "someClass"
```
or `andReadable` to output both at once:
```
style.someClass.andReadable // "someClass sLEHb"
```

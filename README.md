# StyleTree

Write your styles in JSON while retaining all the advantages of handwritten css.

## Usage

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
StyleTree.renderStyles() //._sLEHb { height:100px;width:200px; }
```

Notice that StyleTree generates a hashed value of the class name for you. To use it in your html, access it as you would in the object that you originally created:
```
<div class={styles.firstClass}></div> //<div class="sLEHb"></div>
```

### Nested classes

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
._sLEHb { height:100px;width:200px; }
._sLEHb ._Z1glYGA { backgroundColor:"green";color:"red" }
```
You can nest as far as you want, and access the classes in your html the same as before:
```
<div class={styles.outerClass.innerClass}></div> //<div class="_Z1glYGA"></div>
```

### Sibling classes (modifiers)

To hoist a class up one level, prefix it with a `$`. This allows you to nest modifiers inside the class they should affect:
```
StyleTree.createStyles({
  someClass: {
    height: 100,

    $active: {
      color: "red"
    },

    $inactive: {
      color: "blue"
    }
  }
};
```
Outputs this css:
```
._sLEHb { height:100px; }
._sLEHb._Z1glYGA { color:"red" }
._sLEHb._ZRrWwbD { color:"blue" }
```
In your html, you only need to call the modifier and it will output the base class as well:
```
<div class={styles.someClass.active}></div> //<div class="_sLEHb _Z1glYGA"></div>
```

### Pseudo selectors
```
StyleTree.createStyles({
  someClass: {
    height: 100,

    ":hover": {
      height: 200
    }
  }
};

._sLEHb { height:100px; }
._sLEHb:hover { height:200px }
```

### Media queries

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

._sLEHb { height:100px; }
@media (max-width: 300px) { ._sLEHb { height:200px } }
```

##Utility properties
Sometimes you may want to use the original names you created for your css classes. To do that grab the `readable` property from the class:
```
style.someClass.readable // "someClass"
```
or `andReadable` to output both at once:
```
style.someClass.andReadable // "someClass _sLEHb"
```
Note that the readable class name will NOT style the element; it is included only to be used as a javascript hook or for some other purpose.

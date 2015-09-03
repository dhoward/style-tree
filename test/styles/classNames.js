import hash from 'object-hash';

const firstClass = hash({
  height: 100,
  lineHeight: 2,
  width: 200,
});

const firstClassModifier = hash({
  height: "777px"
});

const thingInsideIt = hash({
  color: "babyblue",
  MozBorderRadius: 3,
  transition: "all 2s"
});

const secondClass = hash({
  color: "red",
  textAlign: "center"
});


export {
  firstClass,
  firstClassModifier,
  thingInsideIt,
  secondClass
};
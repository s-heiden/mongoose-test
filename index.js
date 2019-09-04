let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

let onceOpenCallback = () => {
  console.log("we're connected!");

  let kittySchema = new mongoose.Schema({
    uuid: String,
    name: String,
    cuteness: Number
  });

  /*
  
  Compile schema into a model.
  
  A model is a class with which we construct documents. In this case, each document will be a kitten with 
  properties and behaviors as declared in our schema. Let's create a kitten document representing the little 
  guy we just met on the sidewalk outside:

  */
  let Kitten = mongoose.model("Kitten", kittySchema);
  let kittens = [];

  kittens.push(
    new Kitten({
      uuid: "1212-1212-1212-4545",
      name: "silence",
      cuteness: 7
    })
  );

  kittens.push(
    new Kitten({
      uuid: "8989-6565-7878-4523",
      name: "red",
      cuteness: 3
    })
  );

  kittens.push(
    new Kitten({
      uuid: "1111-4545-6565-7373",
      name: "el paso",
      cuteness: 2
    })
  );

  // we remove all Documents from Kitten
  Kitten.deleteMany({}, () => console.log("delete many\n"));

  // we add all kittens
  kittens.forEach(kitten => {
    kitten.save((err, silence) => {
      console.log(
        err ? err : silence.uuid + ", " + silence.name + ", " + silence.cuteness
      );
    });
  });

  Kitten.find((err, kittens) => {
    console.log(err ? err : kittens.join("\n"));
  });
};

db.once("open", onceOpenCallback);

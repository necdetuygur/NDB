const NDB = new Proxy(JSON.parse("" + localStorage.getItem("NDB")) || {}, {
  set(obj, prop, value) {
    obj[prop] = value;
    localStorage.setItem("NDB", JSON.stringify(obj));
    return value;
  },
  get(obj, prop) {
    return obj[prop];
  },
});

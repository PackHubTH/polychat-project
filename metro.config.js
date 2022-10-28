 const { getDefaultConfig } = require("@expo/metro-config");
 const defaultConfig = getDefaultConfig(__dirname);

 defaultConfig.resolver.assetExts.push(
    "cjs","mjs","png"
 );

 defaultConfig.resolver.sourceExts.push(
    "js","jsx","ts","tsx","json"
 );

// const main = {
//     projectRoot: ".",
//     resolver: {
//         assetExts: ["cjs","mjs","png"],
//         sourceExts: ["js","jsx","ts","tsx","json"]
//     },
// }

console.log("Running Metro Config");
module.exports = defaultConfig;
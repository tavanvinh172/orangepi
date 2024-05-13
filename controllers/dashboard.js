module.exports = {
  dashboardView: (req, res) => {
    var fs = require("fs");
    console.log(process.env.USERPROFILE);
    const file = `${process.env.USERPROFILE.replaceAll(
      "\\",
      "/"
    )}/Downloads/XML`;
    fs.readdir(file, function (err, filenames) {
      res.render("dashboard", { files: filenames });
    });
  },

  downloadFile: (req, res) => {
    const file = `${process.env.USERPROFILE.replaceAll(
      "\\",
      "/"
    )}/Downloads/XML/${req.params.fileName}`;
    console.log(file);
    res.download(file, req.params.fileName, (err) => {
      if (err) {
        // Handle error, such as file not found
        console.error("Error downloading file:", err);
        res.status(404).send("File not found");
      } else {
        console.log("File is sent successfully");
      }
    });
  },
};

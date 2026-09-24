function doGet() {
  // Gantikan PARENT_FOLDER_ID dengan ID Folder utama Google Drive anda
  var parentFolderId = "1tXdUTGcLTUaGxfendhpLScZtei9-6kTP";
  var parentFolder = DriveApp.getFolderById(parentFolderId);
  var rideFolders = parentFolder.getFolders();

  var result = [];

  while (rideFolders.hasNext()) {
    var rideFolder = rideFolders.next();
    var rideName = rideFolder.getName(); // Cth: "2026-05-10_Genting Highlands"

    var rideData = {
      rideName: rideName,
      pictures: [],
      videos: [],
    };

    var subFolders = rideFolder.getFolders();
    while (subFolders.hasNext()) {
      var subFolder = subFolders.next();
      var subName = subFolder.getName().toLowerCase();

      // Semak sub-folder Picture / Photos
      if (
        subName.includes("picture") ||
        subName.includes("photo") ||
        subName.includes("gambar")
      ) {
        var files = subFolder.getFiles();
        while (files.hasNext()) {
          var file = files.next();
          rideData.pictures.push({
            id: file.getId(),
            name: file.getName(),
            url: "https://lh3.googleusercontent.com/d/" + file.getId(),
            downloadUrl: file.getDownloadUrl(),
          });
        }
      }
      // Semak sub-folder Video / Videos
      else if (subName.includes("video")) {
        var files = subFolder.getFiles();
        while (files.hasNext()) {
          var file = files.next();
          rideData.videos.push({
            id: file.getId(),
            name: file.getName(),
            url: file.getUrl(),
            downloadUrl: file.getDownloadUrl(),
          });
        }
      }
    }

    result.push(rideData);
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

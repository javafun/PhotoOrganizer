const testFolder = './photos2/';
const fs = require('fs');
const util = require('util');
const path = require('path');
const ExifImage = require('exif').ExifImage;

fs.readdir(testFolder, (err, files) => {
    var years = [];

    files.forEach(file => {

        var filePath = path.resolve(__dirname, testFolder, file);

        if (!fs.lstatSync(filePath).isDirectory()) {
            fs.stat(filePath, (err, stats) => {
                if (file !== '.DS_Store') {
                    new ExifImage({ image: filePath }, function(error, exifData) {
                        if (error)
                            console.log('Error: ' + error.message);
                        else {

                            //console.log(exifData.exif.DateTimeOriginal.constructor.name);

                            //var mtime = new Date(exifData.exif.DateTimeOriginal);

                            //console.log(mtime);

                            if (exifData.exif.length) {
                                console.log(exifData.exif.DateTimeOriginal);

                                let dtString = exifData.exif.DateTimeOriginal.substring(0, 10);

                                let newDtString = dtString.replace(":", "-");

                                let dt = Date.parse(newDtString);

                                var mtime = new Date(dt);

                                var yearFolder = path.resolve(__dirname, testFolder, mtime.getFullYear().toString());
                                var monthFolder = path.resolve(yearFolder, ("0" + (mtime.getMonth() + 1)).slice(-2));
                                var dateFolder = path.resolve(monthFolder, ("0" + mtime.getDate()).slice(-2));
                                console.log(dateFolder);

                                if (!fs.existsSync(yearFolder)) {
                                    fs.mkdir(yearFolder, () => {
                                        console.log(`Folder - ${yearFolder} created`);
                                    });
                                }

                                if (!fs.existsSync(monthFolder)) {
                                    fs.mkdir(monthFolder, () => {
                                        console.log(`Folder - ${monthFolder} created`);
                                    });
                                }

                                if (!fs.existsSync(dateFolder)) {
                                    fs.mkdir(dateFolder, () => {
                                        console.log(`Folder - ${dateFolder} created`);

                                    });
                                }
                                fs.rename(filePath, path.resolve(dateFolder, file));
                            }


                        }
                    });

                    //             let fileTaken = file.split('_')[0];
                    //             let fileTakenYear = fileTaken.substring(0,4);
                    //             let fileTakenMonth = fileTaken.substring(4,6);
                    //             let fileTakenDate = fileTaken.substring(6,8);
                    //             console.log(dateFolder);

                    // //             var mtime = new Date(util.inspect(stats.mtime));

                    //             var yearFolder = path.resolve(__dirname, testFolder, fileTakenYear);
                    //             var monthFolder = path.resolve(yearFolder, fileTakenMonth);
                    //             var dateFolder = path.resolve(monthFolder, fileTakenDate);
                    // //             console.log(dateFolder);

                    //             if (!fs.existsSync(yearFolder)) {
                    //                 fs.mkdir(yearFolder, () => {
                    //                     console.log(`Folder - ${yearFolder} created`);
                    //                 });
                    //             }

                    //             if (!fs.existsSync(monthFolder)) {
                    //                 fs.mkdir(monthFolder, () => {
                    //                     console.log(`Folder - ${monthFolder} created`);
                    //                 });
                    //             }

                    //             if (!fs.existsSync(dateFolder)) {
                    //                 fs.mkdir(dateFolder, () => {
                    //                     console.log(`Folder - ${dateFolder} created`);

                    //                 });
                    //             }
                    //             fs.rename(filePath, path.resolve(dateFolder, file));


                }
            });
        }

    });
})

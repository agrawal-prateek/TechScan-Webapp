const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', function (req, res) {

    function readJSONFile(filename, callback) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                callback(err);
                return;
            }
            try {
                callback(null, JSON.parse(data));
            } catch (exception) {
                callback(exception);
            }
        });
    }

    readJSONFile('data.json', function (err, json) {
        if (err) {
            throw err;
        }

        let flag;
        let languages = [];
        let nolanguagerepo = 0;

        for (let i = 0; i < json.length; i++) {

            if (json[i].payload !== undefined && json[i].payload !== null) {
                if (json[i].payload.pull_request !== undefined && json[i].payload.pull_request !== null) {
                    if (json[i].payload.pull_request.head !== undefined && json[i].payload.pull_request.head !== null) {
                        if (json[i].payload.pull_request.head.repo !== undefined && json[i].payload.pull_request.head.repo !== null) {
                            if (json[i].payload.pull_request.head.repo.language !== undefined && json[i].payload.pull_request.head.repo.language !== null) {
                                for (let i = 0; i < json.length; i++) {
                                    if (json[i].repo !== undefined) {
                                        nolanguagerepo++;
                                        break;
                                    }
                                }
                                flag = 0;
                                for (let j in languages) {
                                    if (languages[j].name === json[i].payload.pull_request.head.repo.language) {
                                        languages[j].repo += 1;
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (!flag) {
                                    languages.push({
                                        name: json[i].payload.pull_request.head.repo.language,
                                        repo: 1
                                    });
                                }
                            }
                        }
                    }
                }
            }

            if (json[i].payload !== undefined && json[i].payload !== null) {
                if (json[i].payload.pull_request !== undefined && json[i].payload.pull_request !== null) {
                    if (json[i].payload.pull_request.base !== undefined && json[i].payload.pull_request.base !== null) {
                        if (json[i].payload.pull_request.base.repo !== undefined && json[i].payload.pull_request.base.repo !== null) {
                            if (json[i].payload.pull_request.base.repo.language !== undefined && json[i].payload.pull_request.base.repo.language !== null) {
                                for (let i = 0; i < json.length; i++) {
                                    if (json[i].repo !== undefined) {
                                        nolanguagerepo++;
                                        break;
                                    }
                                }

                                flag = 0;
                                for (let j in languages) {
                                    if (languages[j].name === json[i].payload.pull_request.base.repo.language) {
                                        languages[j].repo += 1;
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (!flag) {
                                    languages.push({
                                        name: json[i].payload.pull_request.base.repo.language,
                                        repo: 1
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        res.render('index', {
            title: 'TechScan',
            languages: languages,
            nolanguagerepo: nolanguagerepo
        });
    });
});

module.exports = router;

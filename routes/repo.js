"use strict";
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
        let repo = [];
        let nonlanguagerepo = [];

        for (let i = 0; i < json.length; i++) {
            if (json[i].repo !== undefined) {

                flag = 0;
                for (let j in nonlanguagerepo) {
                    if (nonlanguagerepo[j].id === json[i].repo.id) {
                        flag = 1;
                        break;
                    }
                }
                if (!flag) {
                    nonlanguagerepo.push({
                        id: json[i].repo.id,
                        full_name: json[i].repo.name,
                        url: json[i].repo.url,
                    });
                }
            }
        }
        let title = '';
        for (let i = 1; i < req._parsedOriginalUrl.pathname.length; i++) {
            title += req._parsedOriginalUrl.pathname[i];
        }
        if(title==='F')
            title='F#';
        for (let i = 0; i < json.length; i++) {
            if (json[i].payload !== undefined && json[i].payload !== null) {
                if (json[i].payload.pull_request !== undefined && json[i].payload.pull_request !== null) {
                    if (json[i].payload.pull_request.head !== undefined && json[i].payload.pull_request.head !== null) {
                        if (json[i].payload.pull_request.head.repo !== undefined && json[i].payload.pull_request.head.repo !== null) {
                            if (json[i].payload.pull_request.head.repo.language !== undefined && json[i].payload.pull_request.head.repo.language !== null && json[i].payload.pull_request.head.repo.language === title) {

                                flag = 0;
                                for (let j in repo) {
                                    if (repo[j].id === json[i].payload.pull_request.head.repo.id) {
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (!flag) {
                                    repo.push({
                                        id: json[i].payload.pull_request.head.repo.id,
                                        full_name: json[i].payload.pull_request.head.repo.full_name,
                                        url: json[i].payload.pull_request.head.repo.html_url,
                                        open_issues:json[i].payload.pull_request.head.repo.open_issues,
                                        type:json[i].payload.pull_request.head.user.type
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
                            if (json[i].payload.pull_request.base.repo.language !== undefined && json[i].payload.pull_request.base.repo.language !== null && json[i].payload.pull_request.base.repo.language === title) {
                                flag = 0;
                                for (let j in repo) {
                                    if (repo[j].id === json[i].payload.pull_request.base.repo.id) {
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (!flag) {
                                    repo.push({
                                        id: json[i].payload.pull_request.base.repo.id,
                                        full_name: json[i].payload.pull_request.base.repo.full_name,
                                        url: json[i].payload.pull_request.base.repo.html_url,
                                        open_issues:json[i].payload.pull_request.base.repo.open_issues,
                                        type:json[i].payload.pull_request.base.user.type
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        res.render('repo', {
            title: title,
            repo: repo,
            nonlanguagerepo: nonlanguagerepo
        });
    });
});

module.exports = router;

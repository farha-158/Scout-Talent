"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobStatus = exports.WorkMode = exports.JobType = void 0;
var JobType;
(function (JobType) {
    JobType["FULL_TIME"] = "Full_Time";
    JobType["PART_TIME"] = "Part_Time";
    JobType["CONTRACT"] = "Contract";
    JobType["FREELANCE"] = "Freelance";
    JobType["INTERNSHIP"] = "Internship";
    JobType["TEMPORARY"] = "Temporary";
})(JobType || (exports.JobType = JobType = {}));
var WorkMode;
(function (WorkMode) {
    WorkMode["ONSITE"] = "Onsite";
    WorkMode["REMOTE"] = "Remote";
    WorkMode["HYBRID"] = "Hybrid";
})(WorkMode || (exports.WorkMode = WorkMode = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["DRAFT"] = "Draft";
    JobStatus["PUBLISHED"] = "Published";
    JobStatus["CLOSED"] = "Closed";
    JobStatus["PAUSED"] = "Paused";
    JobStatus["EXPIRED"] = "Expired";
    JobStatus["FILLED"] = "Filled";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
//# sourceMappingURL=job.enum.js.map
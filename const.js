const masterList = [
  { key: 'applicationNumber', label: 'Application Number' },
  { key: 'contactNumber', label: 'Contact Number' },
  { key: 'ApplicantName', label: "Registered owner/Applicant's Name" },
  { key: 'emailAddress', label: 'Email Address' },
  { key: 'physicalDisability', label: 'Physical Disability' },
  { key: 'vehicleRegistrationMark', label: 'Vehicle Registration Mark' },
  { key: 'vehicleType', label: 'Vehicle Type' },
  { key: 'licenceExpires', label: 'Licence Expires' },
  { key: 'remarks', label: 'Remarks' },
  { key: 'agreeRequirement', label: 'Agreed Requirement' },
  { key: 'submissionDateTime', label: 'Submission DateTime' },
  { key: 'staffRemark', label: 'Staff Remark' },
];

const application = [
  { key: 'applicationNumber', label: 'Application Number' },
  { key: 'vehicleRegistrationMark', label: 'Vehicle Registration Mark' },
  { key: 'aa', label: '', getter: () => 0 },
  { key: 'aa', label: '', getter: () => 0 },
  { key: 'aa', label: '', getter: () => 1 },
  { key: 'index', label: 'Sequence' },
  { key: 'aa', label: '', getter: () => 220314000000 },
];

module.exports = {
  masterList,
  application,
};